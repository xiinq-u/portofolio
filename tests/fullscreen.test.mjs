import test from 'node:test';
import assert from 'node:assert/strict';
import { hasFullscreen, togglePageFullscreen } from '../app/lib/fullscreen.ts';

test('standard fullscreen enters and exits', async () => {
  const doc = { fullscreenElement: null, fullscreenEnabled: true, documentElement: {} };
  doc.documentElement.requestFullscreen = async () => { doc.fullscreenElement = doc.documentElement; };
  doc.exitFullscreen = async () => { doc.fullscreenElement = null; };
  assert.equal(await togglePageFullscreen(doc), 'entered');
  assert.equal(hasFullscreen(doc), true);
  assert.equal(await togglePageFullscreen(doc), 'exited');
  assert.equal(hasFullscreen(doc), false);
});

test('WebKit fullscreen enters and exits with its supported methods', async () => {
  const doc = { webkitFullscreenElement: null, documentElement: {} };
  doc.documentElement.webkitRequestFullscreen = () => { doc.webkitFullscreenElement = doc.documentElement; };
  doc.webkitExitFullscreen = () => { doc.webkitFullscreenElement = null; };
  assert.equal(await togglePageFullscreen(doc), 'entered');
  assert.equal(hasFullscreen(doc), true);
  assert.equal(await togglePageFullscreen(doc), 'exited');
  assert.equal(hasFullscreen(doc), false);
});

test('iPhone-style missing page API returns unsupported instead of throwing', async () => {
  assert.equal(await togglePageFullscreen({ documentElement: {} }), 'unsupported');
});

test('disabled fullscreen does not invoke the method', async () => {
  assert.equal(await togglePageFullscreen({ fullscreenEnabled: false, documentElement: {
    requestFullscreen() { assert.fail('must not invoke a disabled API'); },
  } }), 'unsupported');
});

test('browser rejection reaches the caller so the UI can explain the failure', async () => {
  const denied = new Error('NotAllowedError');
  await assert.rejects(togglePageFullscreen({ documentElement: {
    requestFullscreen() { return Promise.reject(denied); },
  } }), denied);
});
