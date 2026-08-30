import re

with open('src/app/gioi-thieu/page.tsx', 'r') as f:
    lines = f.readlines()

# Fix breadcrumb (lines 1230-1245)
for i in range(1230, 1250):
    if "justifyContent: 'space-between'," in lines[i]:
        if "flexWrap" not in lines[i+1]:
            lines.insert(i+1, "            flexWrap: 'wrap',\n            gap: '8px',\n")
        break

# Fix table wrapper (around line 1970)
for i in range(1960, 1990):
    if "className=\"responsive-grid\"" in lines[i] and "<table" in lines[i+1]:
        lines[i] = "            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>\n"
        break

with open('src/app/gioi-thieu/page.tsx', 'w') as f:
    f.writelines(lines)
