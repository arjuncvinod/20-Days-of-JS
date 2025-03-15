import React, { useRef } from 'react';
import './Modal.css';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import { CSSTransition } from 'react-transition-group';

const ModalOverlay = props => {
  console.log('Modal rendering...'); 

  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
        <div className={`modal__content ${props.contentClass}`}>{props.children}</div>
        <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

function Modal(props) {
  const nodeRef = useRef(null); 

  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef} 
      >
        <div ref={nodeRef}>
          <ModalOverlay {...props} />
        </div>
      </CSSTransition>
    </React.Fragment>
  );
}

export default Modal;
