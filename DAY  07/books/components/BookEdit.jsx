import React, { useState } from 'react'

function BookEdit({book,onSubmit}) {
    const [title,setTitle] =useState(book.title);

    const handleChange = (event)=>{
        setTitle(event.target.value);
    }
    const handleSubmit =(event)=>{
        event.preventDefault();
        onSubmit(book.id,title);
        
    }
  return (
    <div>
      <form onSubmit={handleSubmit} className='book-edit' action="">
        <label htmlFor="">Title</label>
        <input onChange={handleChange} className='input' value={title} type="text" id="edit" />
        <button className='button is-primary'>Save</button>
      </form>
    </div>
  )
}

export default BookEdit
