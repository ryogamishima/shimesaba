import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const createStyledText = (styleType) => {
    const maxLineWidth = Math.max(text.length, 20); // 最大の行の幅をテキストの長さまたは20に設定
    const paddingTotal = Math.max(maxLineWidth - text.length, 0); // テキストの左右に追加する空白の合計長さ
    const paddingLeft = ' '.repeat(Math.floor(paddingTotal / 2)); // テキストの左に追加する空白
    const paddingRight = ' '.repeat(Math.ceil(paddingTotal / 2)); // テキストの右に追加する空白
    const styledText = `${paddingLeft}${text}${paddingRight}`; // テキストを中央揃えにする

    let topLine, bottomLine;
    if (styleType === 1) {
      const borderLine = '━'.repeat(maxLineWidth);
      topLine = `╭${borderLine}╮`;
      bottomLine = `╰${borderLine}╯`;
    } else if (styleType === 2) {
      const borderLine = '━'.repeat(maxLineWidth - 2);
      topLine = `◇${borderLine}◇`;
      bottomLine = `◇${borderLine}◇`;
    } else {
      const borderLine = '◤◢'.repeat(maxLineWidth / 4);
      topLine = borderLine;
      bottomLine = borderLine;
    }
    
    setDisplayedText(`${topLine}\n${styledText}\n${bottomLine}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedText)
      .then(() => alert('コピーしました！'))
      .catch((err) => console.error('コピーに失敗しました: ', err));
  };

  return (
    <div className="App">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="ここに入力してね"
      />
      <div className="style-buttons">
        <button onClick={() => createStyledText(1)} className="style-button">╭━━━╮<br/>━━━<br/>╰━━━╯</button>
        <button onClick={() => createStyledText(2)} className="style-button">◇━━━◇<br/>━━━<br/>◇━━━◇</button>
        <button onClick={() => createStyledText(3)} className="style-button">◤◢◤◢◤◢<br/>◤◢◤◢◤◢</button>
      </div>
      <div className="displayed-text-box">
        <pre>{displayedText}</pre>
      </div>
      <button onClick={handleCopy} className="copy-button">コピーする</button>
    </div>
  );
}

export default App;
