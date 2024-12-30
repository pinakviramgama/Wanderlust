const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      filename: "cozy-beachfront-cottage.jpg",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      url: "https://media.graphassets.com/kcqbCpucTbmzbM5yqelI",
      filename: "modern-loft-downtown.jpg",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshRa7CTKWUhE12JwpYJwjMFNb29oioXL3K9izXh2SdGnhOeciH23D7AzseZXxoYqBkjY&usqp=CAU",
      filename: "mountain-retreat.jpg",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      url: "https://assets.cntraveller.in/photos/61160b855ee2ad4060e8ca19/16:9/w_1920,h_1080,c_limit/Summertime_goa_indiasbestvilla_lead.jpg",
      filename: "historic-villa-tuscany.jpg",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8GXZXpSa44gNDjP8xFKI1Fx4Xq48B69E17Q&s",
      filename: "secluded-treehouse-getaway.jpg",
    },
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      url: "https://theglossarymagazine.com/wp-content/uploads/Villa-Palmira-01.webp",
      filename: "beachfront-paradise.jpg",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvhRh53eozWVWhvKfAs6zPq3D8QD8QjfT1Ow&s",
      filename: "rustic-cabin-lake.jpg",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMBoJd4z4uycXcrvLgW9gxDcLKKLW2ib7iyQ&s",
      filename: "luxury-penthouse-city-views.jpg",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      url: "https://ml5vpmchq2rr.i.optimole.com/w:auto/h:auto/q:mauto/f:best/ig:avif/https://iconprivatecollection.com/wp-content/uploads/2019/07/TRV-Main-_-Villa-One-Infinity-Pools-Evening.jpg",
      filename: "ski-in-ski-out-chalet.jpg",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6LYabbmP5u3b0B4khe7vc_TexcTUmwbpPLg&s",
      filename: "safari-lodge-serengeti.jpg",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-28326576/original/d1f07af0-0b69-4d3c-9de3-0a5e7af780ce.png",
      filename: "historic-canal-house.jpg",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      url: "https://go-goa.guide/assets/images/airbnb-goa-villa-12-883x587.jpg",
      filename: "private-island-retreat.jpg",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhHftTHKf_099ahYmeQlB_lGww7idUBym1g&s",
      filename: "charming-cottage-cotswolds.jpg",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-33598312/original/5bc35001-c69a-414d-82d3-49d427723c77.jpeg?im_w=720&im_format=avif",
      filename: "historic-brownstone-boston.jpg",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1342225/original/dd91e367-a3e4-4b89-9f0d-6c8191581d5b.jpeg",
      filename: "beachfront-bungalow-bali.jpg",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiG4iOtB2WMyNaX1XIhr-bKOkThmJOJYVBDg&s",
      filename: "mountain-view-cabin-banff.jpg",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
  },
];

module.exports = { data: sampleListings };
