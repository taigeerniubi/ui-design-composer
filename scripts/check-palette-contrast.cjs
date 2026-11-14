#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

// This checks explicit opaque sRGB pairs, not whole-page accessibility.
const input = process.argv[2] || path.join(__dirname, '..', 'assets', 'color-palettes.json');
let checks = 0;
let failures = 0;

function luminance(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error(`Invalid opaque sRGB color: ${hex}`);
  const rgb = hex.slice(1).match(/../g).map(v => parseInt(v, 16) / 255)
    .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

function check(label, foreground, background, minimum) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  const ratio = (values[0] + 0.05) / (values[1] + 0.05);
  checks++;
  if (ratio < minimum) {
    failures++;
    console.error(`FAIL ${label}: ${ratio.toFixed(3)}:1; requires ${minimum}:1`);
  }
  return ratio;
}

try {
  const data = JSON.parse(fs.readFileSync(input, 'utf8'));
  if (data.schemaVersion !== 1 || !Array.isArray(data.palettes) || data.palettes.length === 0) {
    throw new Error('Expected schemaVersion 1 and a nonempty palettes array.');
  }
  const ids = new Set();
  for (const palette of data.palettes) {
    if (!palette.id || ids.has(palette.id)) throw new Error('Missing or duplicate palette id.');
    ids.add(palette.id);
    if (!['light', 'dark'].includes(palette.mode)) throw new Error(`Invalid mode: ${palette.id}`);
    const t = palette.tokens;
    for (const value of Object.values(t)) luminance(value);
    const before = failures;
    for (const background of ['background', 'surface']) {
      check(`${palette.id}.text/${background}`, t.text, t[background], 4.5);
      check(`${palette.id}.muted/${background}`, t.muted, t[background], 4.5);
      check(`${palette.id}.borderControl/${background}`, t.borderControl, t[background], 3);
      check(`${palette.id}.focusRing/${background}`, t.focusRing, t[background], 3);
    }
    for (const background of ['primary', 'primaryHover', 'primaryPressed']) {
      check(`${palette.id}.onPrimary/${background}`, t.onPrimary, t[background], 4.5);
    }
    check(`${palette.id}.primary/surface`, t.primary, t.surface, 4.5);
    check(`${palette.id}.primary/selection`, t.primary, t.selection, 4.5);
    if (before === failures) console.log(`PASS ${palette.id} (${palette.name})`);
  }
  for (const mode of ['light', 'dark']) {
    for (const name of ['success', 'info', 'warning', 'danger']) {
      const pair = data.semantic[mode][name];
      check(`${mode}.${name}.text/background`, pair.text, pair.background, 4.5);
    }
  }
  console.log(`${checks} explicit color-pair checks; ${failures} failures.`);
  process.exitCode = failures ? 1 : 0;
} catch (error) {
  console.error(`Invalid palette data: ${error.message}`);
  process.exitCode = 2;
}
