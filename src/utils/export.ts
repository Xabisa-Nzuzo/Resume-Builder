import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData, ResumeTemplate } from '../types';

// Export as PDF
export const exportToPDF = async (elementId: string, fileName: string = 'resume.pdf'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

// Export as HTML
export const exportToHTML = (elementId: string, fileName: string = 'resume.html'): void => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  try {
    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Add basic styling
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: white;
      }
      * {
        box-sizing: border-box;
      }
    `;
    
    // Create HTML document
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        ${style.outerHTML}
      </head>
      <body>
        ${clonedElement.outerHTML}
      </body>
      </html>
    `;
    
    // Create blob and download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error exporting to HTML:', error);
    throw error;
  }
};

// Export as DOCX
export const exportToDOCX = async (resumeData: ResumeData, fileName: string = 'resume.docx'): Promise<void> => {
  try {
    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header with name and title
            new Paragraph({
              text: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`,
              heading: HeadingLevel.HEADING_1,
              spacing: {
                after: 120,
              },
            }),
            new Paragraph({
              text: resumeData.personalInfo.title,
              heading: HeadingLevel.HEADING_2,
              spacing: {
                after: 200,
              },
            }),
            
            // Contact information
            new Paragraph({
              children: [
                new TextRun({ text: 'Email: ', bold: true }),
                new TextRun(resumeData.personalInfo.email),
                new TextRun({ text: ' | Phone: ', bold: true }),
                new TextRun(resumeData.personalInfo.phone),
                new TextRun({ text: ' | Location: ', bold: true }),
                new TextRun(resumeData.personalInfo.location),
              ],
              spacing: {
                after: 200,
              },
            }),
            
            // Summary
            new Paragraph({
              text: 'PROFESSIONAL SUMMARY',
              heading: HeadingLevel.HEADING_3,
              thematicBreak: true,
              spacing: {
                after: 120,
              },
            }),
            new Paragraph({
              text: resumeData.summary,
              spacing: {
                after: 200,
              },
            }),
            
            // Experience
            new Paragraph({
              text: 'EXPERIENCE',
              heading: HeadingLevel.HEADING_3,
              thematicBreak: true,
              spacing: {
                after: 120,
              },
            }),
            ...resumeData.experience.flatMap(exp => [
              new Paragraph({
                text: `${exp.position} | ${exp.company}`,
                heading: HeadingLevel.HEADING_4,
                spacing: {
                  after: 80,
                },
              }),
              new Paragraph({
                text: `${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                spacing: {
                  after: 120,
                },
              }),
              new Paragraph({
                text: exp.description,
                spacing: {
                  after: 120,
                },
              }),
              ...exp.achievements.map(achievement => 
                new Paragraph({
                  text: `• ${achievement}`,
                  spacing: {
                    after: 80,
                  },
                })
              ),
              new Paragraph({ text: '', spacing: { after: 160 } }),
            ]),
            
            // Education
            new Paragraph({
              text: 'EDUCATION',
              heading: HeadingLevel.HEADING_3,
              thematicBreak: true,
              spacing: {
                after: 120,
              },
            }),
            ...resumeData.education.flatMap(edu => [
              new Paragraph({
                text: `${edu.degree} in ${edu.field} | ${edu.institution}`,
                heading: HeadingLevel.HEADING_4,
                spacing: {
                  after: 80,
                },
              }),
              new Paragraph({
                text: `${edu.location} | ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`,
                spacing: {
                  after: 120,
                },
              }),
              edu.description ? new Paragraph({
                text: edu.description,
                spacing: {
                  after: 120,
                },
              }) : undefined,
              new Paragraph({ text: '', spacing: { after: 160 } }),
            ].filter(Boolean)),
            
            // Skills
            new Paragraph({
              text: 'SKILLS',
              heading: HeadingLevel.HEADING_3,
              thematicBreak: true,
              spacing: {
                after: 120,
              },
            }),
            new Paragraph({
              text: resumeData.skills.map(skill => skill.name).join(', '),
              spacing: {
                after: 200,
              },
            }),
          ],
        },
      ],
    });
    
    // Generate and save document
    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error exporting to DOCX:', error);
    throw error;
  }
};