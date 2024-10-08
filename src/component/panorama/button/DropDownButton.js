import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropDownButton({ handleDropdownChange , floor}) {
  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="light" 
        id="dropdown-basic" 
        style={{ 
          backgroundColor: '#90EE90', 
          color: 'black',
          fontSize: '20px', // フォントサイズを大きく
          width: '200px', // ボタンの幅を調整
          height: '60px' // ボタンの高さを調整
        }}>
        FLOOR {floor}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleDropdownChange(1)}>1</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange(2)}>2</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange(3)}>3</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange(4)}>4</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange(5)}>5</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownButton;
