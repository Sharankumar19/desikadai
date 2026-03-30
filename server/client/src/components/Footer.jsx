import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-moss text-white mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌿</span>
            <span className="font-display text-xl font-bold"> Desikadai</span>
          </div>
          <p className="text-forest-200 text-sm leading-relaxed">
            Bringing nature closer to home. Curated plants and accessories for
            every space and skill level.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-forest-100">Quick Links</h4>
          <ul className="space-y-2 text-sm text-forest-200">
            {[
              ["/", "Home"],
              ["/blog", "Blog"],
              ["/about", "About Us"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-forest-100">Contact Us</h4>
          <ul className="space-y-2 text-sm text-forest-200">
            <li className="flex items-center gap-2">
              <span>📧</span>{" "}
              <a href="mailto:desikadai8@gmail.com">desikadai8@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span> <a href="tel:+91 83006 21315">+91 83006 21315</a>
            </li>
            <a
              href="https://wa.me/918300621315?text=Hi%20I%20want%20to%20buy%20plants"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
            >
              <FaWhatsapp size={26} />
            </a>
            <li className="flex items-center gap-2">
              <span>📍</span> 43, Angalamman Koil Street, Villupuram (Dist.)
              605602
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-leaf mt-10 pt-6 text-center text-xs text-forest-300">
        © {new Date().getFullYear()} Desikadai. All rights reserved. Made with
        🌱 and love.
      </div>
    </div>
  </footer>
);

export default Footer;
