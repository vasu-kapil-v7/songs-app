import React from 'react';
import { Modal, ModalProps } from '@mui/material';

const styles = {
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
  },
};

const ModalComponent: React.FC<ModalProps> = ({ children, onClose, ...otherProps }) => {
  return (
    <Modal onClose={onClose} {...otherProps} >
      <div style={styles.modalContainer}>
        <div style={styles.modalContent}>{children}</div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
