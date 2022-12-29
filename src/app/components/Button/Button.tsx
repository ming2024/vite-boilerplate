import React, { useState } from 'react';

// type ButtonProps = {
//   children: ReactNode;
// };
// function Button({ children }: ButtonProps): JSX.Element {
//   return <button className={classes.button}>{children}</button>;
// }

// export default Button;

import { Document, Page, pdfjs } from 'react-pdf';

import pdfjsWorker from 'react-pdf/node_modules/pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const PdfContentPreview: React.FC = () => {
  const [, setPdfLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setWrapperHeight] = useState(0);

  return (
    <div>
      <div>
        <Document
          file={
            'https://storage.googleapis.com/90seconds-production-attachments/attachment/attachment/b435fec943c28b30b123269604324128/DWYER-Nov2022cv.pdf'
          }
          onLoadSuccess={({ numPages }) => {
            setTotalPages(numPages);
          }}
          onItemClick={({ pageNumber }) => setCurrentPage(Number(pageNumber))}
        >
          {Array.from(new Array(totalPages), (_, index) => (
            <div
              key={`page_${index + 1}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              <Page
                renderAnnotationLayer={false}
                renderTextLayer={false}
                pageNumber={index + 1}
                className={currentPage === index + 1 ? 'selected' : ''}
              />
            </div>
          ))}
        </Document>
      </div>
      <div>
        <div>
          <Document
            file={
              'https://storage.googleapis.com/90seconds-production-attachments/attachment/attachment/b435fec943c28b30b123269604324128/DWYER-Nov2022cv.pdf'
            }
            onLoadSuccess={async (page) => {
              const pageObj = await page.getPage(1);
              const pageHeight = pageObj.view[3];
              setWrapperHeight(pageHeight);
              setPdfLoaded(true);
            }}
          >
            <Page key={`page_1`} pageNumber={currentPage} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfContentPreview;
