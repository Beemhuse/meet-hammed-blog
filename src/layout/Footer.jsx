import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-inherit py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <p className="text-sm text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Email:</span> info@jstemplate.net
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Phone:</span> 880 123 456 789
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Link</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">About</a></li>
            <li><a href="#" className="hover:text-blue-600">Blog</a></li>
            <li><a href="#" className="hover:text-blue-600">Archived</a></li>
            <li><a href="#" className="hover:text-blue-600">Author</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Category</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Lifestyle</a></li>
            <li><a href="#" className="hover:text-blue-600">Technology</a></li>
            <li><a href="#" className="hover:text-blue-600">Travel</a></li>
            <li><a href="#" className="hover:text-blue-600">Business</a></li>
            <li><a href="#" className="hover:text-blue-600">Economy</a></li>
            <li><a href="#" className="hover:text-blue-600">Sports</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Weekly Newsletter</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get blog articles and offers via email.
          </p>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-600">MetaBlog &copy; JS Template 2023. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Use</a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
