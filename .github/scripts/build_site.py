"""Builds the GitHub Pages site for the code examples.

Copies the repository into the output folder and adds an index.html with a
file listing to every folder that does not have its own index.html.

Usage: python build_site.py <repository folder> <output folder>
"""
import html
import os
import re
import shutil
import sys
from pathlib import Path

EXCLUDE = {".git", ".github", ".idea", "node_modules", "_site"}
REPOSITORY = os.environ.get("GITHUB_REPOSITORY", "Digital-Media/wef1vo-examples")
BRANCH = os.environ.get("GITHUB_REF_NAME", "main")
SITE_TITLE = "WEF1VO/WEF1LE Code Examples"

TITLE_PATTERN = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)

STYLE = """
:root { color-scheme: light dark; --fg: #1f2328; --muted: #59636e; --bg: #ffffff; --line: #d1d9e0; --link: #0969da; }
@media (prefers-color-scheme: dark) {
  :root { --fg: #f0f6fc; --muted: #9198a1; --bg: #0d1117; --line: #3d444d; --link: #4493f8; }
}
body { margin: 0; background: var(--bg); color: var(--fg); font: 16px/1.5 system-ui, sans-serif; }
main { max-width: 52rem; margin: 0 auto; padding: 2rem 1rem; }
h1 { font-size: 1.5rem; margin: 0 0 .25rem; }
nav { color: var(--muted); margin-bottom: 1.5rem; }
a { color: var(--link); text-decoration: none; }
a:hover { text-decoration: underline; }
ul { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--line); }
li { display: flex; gap: 1rem; align-items: baseline; padding: .5rem 0; border-bottom: 1px solid var(--line); }
li .name { flex: 1; }
li .title { color: var(--muted); }
li .source { font-size: .875rem; white-space: nowrap; }
footer { margin-top: 2rem; color: var(--muted); font-size: .875rem; }
"""


def natural_key(path):
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", path.name)]


def page_title(path):
    try:
        match = TITLE_PATTERN.search(path.read_text(encoding="utf-8", errors="replace"))
    except OSError:
        return ""
    return html.unescape(" ".join(match.group(1).split())) if match else ""


def render(folder, root):
    relative = folder.relative_to(root).as_posix()
    parts = [] if relative == "." else relative.split("/")
    depth = len(parts)

    crumbs = [f'<a href="{"../" * depth or "./"}">Home</a>']
    for i, part in enumerate(parts):
        up = "../" * (depth - i - 1)
        crumbs.append(f'<a href="{up or "./"}">{html.escape(part)}</a>' if i < depth - 1 else html.escape(part))

    source_base = f"https://github.com/{REPOSITORY}"
    tree_url = f"{source_base}/tree/{BRANCH}/{relative}" if parts else source_base

    entries = sorted((p for p in folder.iterdir() if p.name not in EXCLUDE and not p.name.startswith(".")),
                     key=lambda p: (p.is_file(), natural_key(p)))
    items = []
    for entry in entries:
        if entry.is_dir():
            items.append(f'<li><span class="name"><a href="{html.escape(entry.name)}/">{html.escape(entry.name)}/</a></span></li>')
            continue
        blob_url = f"{source_base}/blob/{BRANCH}/{(entry.relative_to(root)).as_posix()}"
        title = page_title(entry) if entry.suffix.lower() == ".html" else ""
        title_html = f' <span class="title">{html.escape(title)}</span>' if title else ""
        items.append(f'<li><span class="name"><a href="{html.escape(entry.name)}">{html.escape(entry.name)}</a>{title_html}</span>'
                     f'<a class="source" href="{html.escape(blob_url)}">Source</a></li>')

    heading = SITE_TITLE if not parts else "/".join(parts)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{html.escape(heading)}</title>
    <style>{STYLE}</style>
</head>
<body>
<main>
    <h1>{html.escape(heading)}</h1>
    <nav>{" / ".join(crumbs)} &middot; <a href="{html.escape(tree_url)}">View on GitHub</a></nav>
    <ul>
        {(chr(10) + "        ").join(items) if items else "<li>This folder is empty.</li>"}
    </ul>
    <footer>Code examples for Web Fundamentals, Media Technology and Design, University of Applied Sciences Upper Austria</footer>
</main>
</body>
</html>"""


def main():
    source, output = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
    if output.exists():
        shutil.rmtree(output)
    shutil.copytree(source, output, ignore=lambda folder, names: [n for n in names if n in EXCLUDE])

    count = 0
    for folder, dirs, _ in os.walk(output):
        dirs[:] = [d for d in dirs if d not in EXCLUDE]
        index = Path(folder) / "index.html"
        if not index.exists():
            index.write_text(render(Path(folder), output), encoding="utf-8")
            count += 1
    print(f"Generated {count} index pages in {output}")


if __name__ == "__main__":
    main()
