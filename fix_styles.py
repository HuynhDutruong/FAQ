import re

with open('src/app/gioi-thieu/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove CSS module import
content = content.replace("import styles from './page.module.css';\n", "")

# 2. Replace className={styles.mainLayout}
content = content.replace("className={`wiki-container ${styles.mainLayout}`}", 'className="wiki-container main-layout"')

# 3. Replace className={styles.sidebar}
content = content.replace("className={`wiki-infobox ${styles.sidebar}`}", 'className="wiki-infobox wiki-sidebar"')

# 4. Replace inline grids with responsive-grid
content = re.sub(
    r"style=\{\{\s*display: 'grid',\s*gridTemplateColumns: 'repeat\(auto-fit, minmax\(\d+px, 1fr\)\)',\s*gap: '[^']+',?(?:\s*margin: '[^']+',?)?\s*\}\}",
    'className="responsive-grid"',
    content
)
# Special case for the one on a single line
content = re.sub(
    r"style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fit, minmax\(\d+px, 1fr\)\)', gap: '[^']+' \}\}",
    'className="responsive-grid"',
    content
)

# 5. Replace floating images
content = content.replace(
    "className={styles.floatingImageRight270}\n              style={{\n                padding: '8px',\n                backgroundColor: 'var(--color-card-bg)',\n                border: '1px solid var(--color-border-subtle)',\n                borderRadius: '12px',\n                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'\n              }}\n              className=\"wiki-thumb\"",
    "className=\"floating-img-270\"\n              style={{\n                padding: '8px',\n                backgroundColor: 'var(--color-card-bg)',\n                border: '1px solid var(--color-border-subtle)',\n                borderRadius: '12px',\n                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'\n              }}"
)
content = content.replace(
    "className={styles.floatingImageRight290}\n              style={{\n                padding: '8px',\n                backgroundColor: 'var(--color-card-bg)',\n                border: '1px solid var(--color-border-subtle)',\n                borderRadius: '12px',\n                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'\n              }}\n              className=\"wiki-thumb\"",
    "className=\"floating-img-290\"\n              style={{\n                padding: '8px',\n                backgroundColor: 'var(--color-card-bg)',\n                border: '1px solid var(--color-border-subtle)',\n                borderRadius: '12px',\n                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'\n              }}"
)

# 6. Add style jsx global
style_block = """      {/* Responsive Style */}
      <style jsx global>{`
        /* Bố cục chính (TOC & Article bên trái, Infobox bên phải) */
        .main-layout {
          max-width: 1220px;
          margin: 0 auto;
          padding: 24px 20px;
          display: flex;
          gap: 36px;
          align-items: flex-start;
          box-sizing: border-box;
          width: 100%;
          overflow-x: hidden;
        }

        .wiki-sidebar {
          width: 330px;
          flex-shrink: 0;
        }

        .responsive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
          margin: 18px 0;
        }

        /* Classes cho ảnh float */
        .floating-img-270 { float: right; width: 270px; margin-left: 20px; margin-bottom: 12px; }
        .floating-img-290 { float: right; width: 290px; margin-left: 20px; margin-bottom: 12px; }
        .floating-img-250 { float: right; width: 250px; margin-left: 20px; margin-bottom: 12px; }

        @media (max-width: 900px) {
          .main-layout {
            flex-direction: column-reverse;
            gap: 24px;
            padding: 16px 12px;
          }
          .wiki-sidebar {
            width: 100%;
            margin-bottom: 24px;
          }
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
          
          /* Chống ép chữ bằng cách xóa float trên thiết bị di động */
          .floating-img-270, .floating-img-290, .floating-img-250, .wiki-thumb {
            float: none !important;
            width: 100% !important;
            max-width: 320px;
            margin: 16px auto !important;
            display: block;
          }
        }

        .bishop-card-hover:hover {
          border-color: #B45309 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
}"""

old_style_block_re = re.compile(r"      \{\/\* Responsive Style \*\/}.*?  \);\n}", re.DOTALL)
content = old_style_block_re.sub(style_block, content)

with open('src/app/gioi-thieu/page.tsx', 'w') as f:
    f.write(content)

