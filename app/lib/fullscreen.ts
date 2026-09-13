type WebKitDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => Promise<void> | void;
};
type WebKitElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

export function hasFullscreen(doc: WebKitDocument): boolean {
  return Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
}

export async function togglePageFullscreen(doc: WebKitDocument): Promise<"entered" | "exited" | "unsupported"> {
  const root = doc.documentElement as WebKitElement;
  if (doc.fullscreenElement && doc.exitFullscreen) {
    await doc.exitFullscreen();
    return "exited";
  }
  if (doc.webkitFullscreenElement && doc.webkitExitFullscreen) {
    await doc.webkitExitFullscreen();
    return "exited";
  }
  if (root.requestFullscreen && doc.fullscreenEnabled !== false) {
    await root.requestFullscreen();
    return "entered";
  }
  if (root.webkitRequestFullscreen && doc.webkitFullscreenEnabled !== false) {
    await root.webkitRequestFullscreen();
    return "entered";
  }
  return "unsupported";
}
