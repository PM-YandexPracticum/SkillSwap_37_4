import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import clsx from 'clsx';
import styles from './DropzoneIconCategory.module.css';

interface DropzoneIconCategoryProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string | string[] | undefined;
  multiple?: boolean;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export const DropzoneIconCategory: React.FC<DropzoneIconCategoryProps> = ({
  onFilesSelected,
  placeholder = 'Перетащите или выберите изображения навыка',
  buttonText = 'Выбрать изображения',
  className
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        setError('Только PNG/JPEG и размер до 2 МБ');
        return;
      }
      setError(null);
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': []
    },
    maxSize: 2 * 1024 * 1024, // 2 МБ
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        styles.dropzone,
        {
          [styles.dropzone_active]: isDragActive
        },
        className
      )}
    >
      <input {...getInputProps()} className={styles.inputFile} />
      <p className={styles.paragraph}>
        {isDragActive ? 'Отпустите файлы для загрузки' : placeholder}
      </p>
      <button type='button' className={styles.button} onClick={open}>
        <div className={styles.svg}></div><p className={styles.text_button}>{buttonText}</p>
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default DropzoneIconCategory;
