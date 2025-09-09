// Temporary fallback to satisfy JSX typing when tooling cannot find React's JSX namespace.
// If your editor still flags 7026 errors, keep this file. Otherwise, you can remove it.
declare namespace JSX {
  // Allow any HTML/SVG intrinsic elements
  // This relaxes type checking for JSX tags but unblocks the TypeScript error.
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}



