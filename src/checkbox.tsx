import React, { type ChangeEvent } from 'react'
import './checkbox.css'
interface checkboxItem{
id: number;
label: string;
color: string;
checked: boolean;
}
const Checkbox: React.FC = () => {
    const [checkboxes, setCheckboxes] = React.useState<checkboxItem[]>([{
        id: 1, label: 'Option 1', color: 'red', checked: false,
    }, {
        id: 2, label: 'Option 2', color: 'green', checked: false,
    }, {
        id: 3, label: 'Option 3', color: 'blue', checked: false,
    }])
    const [parentChecked, setParentChecked] = React.useState(false);
    const handleParentChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const checked = e.target.checked;
        setParentChecked(checked)
        setCheckboxes(checkboxes.map((checkbox)=>({...checkbox,checked})))
    }
    const handleChildChange=(e:ChangeEvent<HTMLInputElement>,id:number)=>{
        const checked = e.target.checked;
        const updatedCheckboxes = checkboxes.map((checkbox)=>
            checkbox.id === id ? { ...checkbox, checked } : checkbox
        );
        setCheckboxes(updatedCheckboxes);
        setParentChecked(updatedCheckboxes.every((checkbox)=>checkbox.checked))
    }
  return (
    <div className="checkbox-wrapper">
     <div className="controls">
        <label className='checkbox parent-container'>
            <input type='checkbox' checked={parentChecked} onChange={handleParentChange}/>
            <span className='checkmark parent-checkmark'></span>
            <span className="label-text">Select All</span>
        </label>
     </div>
     <div className="children">
     {checkboxes.map((checkbox)=>(

        <div key={checkbox.id} className="child-row">
            <label className='checkbox child-container'>
                <input type='checkbox' checked={checkbox.checked} onChange={(e)=>handleChildChange(e,checkbox.id)}/>
                <span className={`checkmark child-checkmark ${checkbox.color}`}></span>
                <span className="label-text">{checkbox.label}</span>    
            </label>
        </div>
     ))}
     </div>
    </div>
  )
}

export default Checkbox