import Head from 'next/head';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Obsidian Google Drive</title>
      </Head>
      <h1 className='text-4xl'>Privacy Policy for Obsidian Google Drive</h1>
      <p>Effective Date: November 7, 2024</p>
      <p>
        Thank you for using Daily Journal. This Privacy Policy outlines how your
        personal information is collected, used, and protected when you use the
        App. By using the App, you agree to the practices described in this
        policy.
      </p>
      <h2 className='text-2xl'>
        1. Information We Collect but do not Personally Store
      </h2>
      <p>The Obsidian Google Drive App collects the following information:</p>
      <ul>
        <li>
          <strong>Uploaded Files</strong>: We upload your Obsidian vault to YOUR
          Google Drive. While we &quot;collect&quot; these files, nobody can
          access them but you.
        </li>
      </ul>
      <h2 className='text-2xl'>2. Use of Information</h2>
      <p>The information collected is used for the following purposes:</p>
      <ul>
        <li>
          <strong>Google Drive Integration</strong>: Uploaded files are securely
          stored on your Google Drive account, ensuring your data remains under
          your control.
        </li>
      </ul>
      <h2 className='text-2xl'>3. Data Security</h2>
      <p>
        We take your data security seriously and implement appropriate measures
        to protect it:
      </p>
      <ul>
        <li>
          <strong>Google Drive</strong>: Uploaded files are stored directly in
          your Google Drive account, ensuring that only you have access to them.
        </li>
      </ul>
      <h2 className='text-2xl'>4. Data Access</h2>
      <p>
        The Obsidian Google Drive creators do not have access to the content of
        your files on Google Drive. Your data remains private and inaccessible
        to us.
      </p>
      <h2 className='text-2xl'>5. Third-Party Services</h2>
      <p>
        The app integrates with Google Drive for file storage. Please refer to
        Google&apos;s Privacy Policy for information on how they handle your
        data.
      </p>
      <h2 className='text-2xl'>6. User Control</h2>
      <p>You have control over your data:</p>
      <ul>
        <li>
          <strong>Editing/Deleting Files</strong>: You can edit or delete your
          files at any time within the App or on Google Drive.
        </li>
        <li>
          <strong>Revoking Access</strong>: You can revoke the app&apos;s access
          to your Google Drive account at any time just by logging out.
        </li>
      </ul>
      <h2 className='text-2xl'>7. Updates to Privacy Policy</h2>
      <p>
        We may update this Privacy Policy to reflect changes in how we handle
        your information. We will notify you about significant changes within
        the app.
      </p>
      <h2 className='text-2xl'>8. Contact Us</h2>
      <p>
        If you have questions or concerns about this Privacy Policy, please
        contact us at richard134x@gmail.com.
      </p>
      <p>
        By using the Obsidian Google Drive app, you acknowledge and agree to the
        terms outlined in this Privacy Policy. Please read the policy carefully
        and use the app responsibly.
      </p>
      <p>
        Thank you for trusting the Obsidian Google Drive App to safeguard your
        personal information and enhance your Obsidian experience.
      </p>
    </>
  );
};

export default PrivacyPolicy;
