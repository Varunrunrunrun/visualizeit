"use client"
import Logo from '@/app/_components/Logo';
import React from 'react';

const GettingStarted = () => {
  return (
    <div className="bg-slate-100 text-black p-6 sm:p-10 lg:p-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-blue-400 flex gap-4"><span>Getting Started with</span> <span><Logo /></span></h1>
        
        <p className="mb-4">
          Welcome to Visualzeit, your collaborative platform for creating, sharing, and editing documents and diagrams. This guide will help you get started with the essential features of Visualzeit.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Step 1: Sign Up and Log In</h2>
          <ol className="list-decimal ml-6">
            <li className="mb-2">Sign Up: Create a new account by clicking on the "Sign Up" button on the homepage. Fill in your details and verify your email address.</li>
            <li>Log In: Once your account is created, log in using your credentials.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Step 2: Create a Team</h2>
          <ol className="list-decimal ml-6">
            <li className="mb-2">Navigate to Teams: Click on the "Teams" tab in the navigation bar.</li>
            <li className="mb-2">Create a Team: Click on "Create Team," enter your team's name and description, and click "Create."</li>
            <li>Add Members: Invite team members by entering their email addresses. They will receive an invitation to join your team.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Step 3: Create a New File</h2>
          <ol className="list-decimal ml-6">
            <li className="mb-2">Navigate to Files: Click on the "Files" tab in the navigation bar.</li>
            <li className="mb-2">Create File: Click on "New File," choose between a document or canvas, and give your file a name.</li>
            <li>Edit File: Start writing your document or drawing your diagram. Use the toolbar for text formatting, shapes, lines, and other drawing tools.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Step 4: Share and Collaborate</h2>
          <ol className="list-decimal ml-6">
            <li className="mb-2">Share File: Click on the "Share" button on your file. Select the team members you want to share the file with.</li>
            <li>Collaborate: Team members can view, edit, and comment on shared files in real-time. Use the commenting feature to leave feedback or discuss changes.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Step 5: Save and Export</h2>
          <ol className="list-decimal ml-6">
            <li className="mb-2">Save Changes: Your changes are saved automatically. You can also manually save by clicking the "Save" button.</li>
            <li>Export File: Export your document or diagram in various formats (PDF, PNG, etc.) by clicking on the "Export" button.</li>
          </ol>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Additional Features</h2>
          <ul className="list-disc ml-6">
            <li className="mb-2">Version Control: Access previous versions of your files and revert to earlier versions if needed.</li>
            <li className="mb-2">Templates: Use pre-built templates for common diagram types and document formats to save time.</li>
            <li>Integrations: Connect Visualzeit with other tools and platforms to enhance your workflow.</li>
          </ul>
        </div>

        <div className="mb-6 hidden">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Need Help?</h2>
          <p>If you need further assistance, visit our <a href="/help-center" className="text-blue-400">Help Center</a> or contact our support team at <a href="mailto:support@visualzeit.com" className="text-blue-400">support@visualzeit.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
