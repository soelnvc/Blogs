import re

with open('src/components/LiquidHover.jsx', 'r') as f:
    content = f.read()

# Remove imports
content = re.sub(r'import\s+\{\s*jsx\s+as\s+_jsx\s*\}\s+from\s+"react/jsx-runtime";\n', '', content)
content = re.sub(r'import\s+\{\s*addPropertyControls[^}]+\}\s+from\s+"framer";\n', '', content)
content = re.sub(r'import\s+\{\s*ComponentMessage[^}]+\}\s+from\s+"[^"]+";\n', '', content)

# Remove framer metadata at the top
content = re.sub(r'/\*\*.*?\*/\s*', '', content, flags=re.DOTALL)

# Re-write the return block
return_block_pattern = r'return /\*#__PURE__\*/ _jsx\("div", \{.*?\n\}\);\n\}'
def replacer(match):
    return """
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        top: "0%",
        left: "0%",
      }}
    >
      {image && image.src ? (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "120%",
            height: "120%",
            overflow: "hidden",
            pointerEvents: "none"
          }}
        />
      ) : null}
    </div>
  );
}
"""
content = re.sub(r'return\s+/\*#__PURE__\*/\s*_jsx\("div",\s*\{.*?\n\}\);', replacer, content, flags=re.DOTALL)

# Remove trailing metadata
content = content.split('addPropertyControls(LiquidHover, {')[0]

# Prepend correct react import
content = "import React, { useEffect, useRef } from 'react';\n" + content.replace('import { useEffect, useRef } from "react";', '')

with open('src/components/LiquidHover.jsx', 'w') as f:
    f.write(content.strip())
