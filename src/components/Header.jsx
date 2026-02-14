import { IconHeart } from '@tabler/icons-react';

function Header() {
  return (
    <header className="app-header">
      <div className="app-header-top">
        <span />
        <a
          href="https://buymeacoffee.com/wpbunty"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-donate"
        >
          <IconHeart size={18} />
          Support Me!
        </a>
      </div>
      <h1>Online Unserialize Tool - Unserialize PHP & JSON Data</h1>
      <p>
        Free online unserialize tool to unserialize PHP and JSON data. Beautify serialized data and
        compare multiple results side by side. 100% client-side processing - no cookies, no
        tracking.
      </p>
    </header>
  );
}

export default Header;
