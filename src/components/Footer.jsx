import { IconShield, IconBrandX } from '@tabler/icons-react';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="privacy-notice">
        <IconShield size={20} className="privacy-icon" />
        <div className="privacy-content">
          <strong>Privacy First:</strong> All data processing happens in your browser. No cookies,
          no tracking, no server storage.
        </div>
      </div>

      <section className="seo-content" aria-label="About unserialize tool">
        <h2 className="seo-heading">Online Unserialize Tool - Unserialize PHP & JSON Data</h2>
        <p className="seo-text">
          Use our free <strong>online unserialize tool</strong> to <strong>unserialize PHP</strong>{' '}
          and <strong>unserialize JSON</strong> data instantly. Our{' '}
          <strong>unserialize and compare</strong> tool allows you to beautify serialized data and
          compare multiple results side by side. Whether you need to{' '}
          <strong>unserialize PHP</strong> data or <strong>unserialize JSON</strong> data, our tool
          automatically detects the format.
          <strong>Beautify serialized data</strong> online with our easy-to-use interface.
          <strong>Beautify JSON</strong> and PHP serialized data without any server-side processing
          - everything happens in your browser.
        </p>
        <h3 className="seo-heading">How to Use the Unserialize Tool</h3>
        <p className="seo-text">
          Simply paste your <strong>PHP serialized</strong> or <strong>JSON serialized</strong> data
          into the form above. Our tool will automatically detect whether it's PHP or JSON format
          and unserialize it accordingly. You can compare up to 3 different unserialized data sets
          side by side. Use our <strong>beautify serialized online</strong> feature to format your
          data for easy reading and analysis. Also you can <strong>share comparisons</strong> easily
          using our shareable link feature.
        </p>
      </section>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} Unserialize Guru. All rights reserved.
        </p>
        <p className="made-with-love">
          Made with ❤️ for developers who need to unserialize and compare data quickly and securely.
        </p>
        <p className="made-by">
          Made by:{' '}
          <a
            href="https://x.com/BuntyWP"
            target="_blank"
            rel="noopener noreferrer"
            className="twitter-link"
          >
            <IconBrandX size={14} />
            BuntyWP
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
