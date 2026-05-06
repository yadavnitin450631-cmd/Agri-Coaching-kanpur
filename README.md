# Test Analysis App

Ye ek browser-based test app hai. Students test de sakte hain aur submit ke baad score, accuracy, topic analysis, suggestions, aur question review dekh sakte hain.

## Result Storage

App student name aur roll/mobile leta hai. Submit ke baad result browser ke `localStorage` me save hota hai. Result screen se CSV download aur print report generate kar sakte hain.

Important: `localStorage` result usi browser/device me save hota hai. Agar students apne-apne phone par test denge, to unke results automatically teacher ke paas nahi aayenge. Central online storage ke liye Google Sheets, Firebase, ya backend API connect karna padega.

## GitHub Pages Par Publish Karne Ke Steps

1. GitHub par login karo.
2. New repository banao, naam rakh sakte ho: `test-analysis-app`.
3. Is folder ki ye files upload karo:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `.nojekyll`
4. Repository me `Settings` kholo.
5. `Pages` section me jao.
6. Source me `Deploy from a branch` select karo.
7. Branch me `main` aur folder me `/root` select karke save karo.
8. Thodi der baad student link milega:
   `https://YOUR-GITHUB-USERNAME.github.io/test-analysis-app/`

## Single File Option

Agar aap students ko direct file bhejna chahte hain, to `single-file-test-app.html` bhej sakte hain.
