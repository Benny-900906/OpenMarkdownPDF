import { create } from 'zustand';

interface MarkdownContentState {
  markdownContent: string;
  markdownPrefixes : string[];
  markdownCharacters : string[];
  setMarkdownContent : (content : string) => void;
}

const initialMarkdownContent : string = `# Markdown PDF Generator

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Source Code](#source-code)

## Introduction

**Markdown PDF Generator** is a web application that allows users to create PDF documents from Markdown text. This project is built using React, Tailwind CSS, TypeScript, React-Markdown, and CodeMirror.

Convert your plain text documents written in Markdown format into professionally formatted PDF files with ease. Whether you need to create reports, documentation, or printable content, this tool simplifies the process.

## Features

- **Markdown to PDF Conversion**: Convert Markdown text to PDF documents.
- **Custom Styling**: Apply custom styles using Tailwind CSS to control the appearance of your PDF.
- **Preview**: Real-time preview of the PDF document while editing the Markdown content.
- **Export**: Download the generated PDF for offline use.

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**:
- **React-Markdown**:
- **CodeMirror**:

## Getting Started

1. **_Installation_**: Clone the repository and install the project dependencies.

   \`\`\`bash
   git clone [repository-url]
   cd markdown-pdf-generator
   npm install
   \`\`\`
   
2. **_Run the Application_**: Start the development server.

   \`\`\`bash
   npm run dev
   \`\`\`
  
3. **_Access the App_**: Open your browser and navigate to http://localhost:xxxx to use the Markdown PDF Generator. 

## Usage

1. **Input Markdown Text**: Enter or paste your Markdown content into the editor.
2. **Preview**: See a real-time preview of the PDF document as you make changes.
3. **Generate PDF**:  Click the "EXPORT AS PDF" button to create and download the PDF file.

## Source Code
You can view the source code [here](https://github.com/Benny-900906/markdown-pdf-generator).
`

export const useMarkdownContentStore = create<MarkdownContentState>((set) => ({
  markdownContent: initialMarkdownContent,
  markdownPrefixes: ['#', '##', '###', '-', '```'],
  markdownCharacters: ['#', '-', '`'],
  setMarkdownContent: (content : string) => set({ markdownContent: content }),
}));