import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props{
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [miniatura, setMiniatura] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setMiniatura(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return(
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            
            {
                miniatura 
                ? <img src={miniatura} alt="Upload"/> 
                : (
                    isDragActive ?
                    <p>Solte seu arquivo</p> :
                    <p> <FiUpload /> Arraste seu arquivo aqui</p>
                )
            }

        </div>
    );
}

export default Dropzone;