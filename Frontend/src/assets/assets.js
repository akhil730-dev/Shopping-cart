import laptop from "./laptop.jpg";
import phone from "./phone.jpg";
import Headphones from "./headphone.jpg";
import SmartWatches from "./smartwatch.jpg";
import bottomBanner from './bottom_banner.jpg'

export const categories = [
  {
    text: "Laptops",
    path: "laptops",
    image: laptop,
    bgColor: "#E6F0FF",
  },
  {
    text: "Smartphones",
    path: "phones",
    image: phone,
    bgColor: "#FFF3E6",
  },
  {
    text: "Headphones",
    path: "headphones",
    image: Headphones,
    bgColor: "#F0FFF4",
  },
  {
    text: "Smart Watches",
    path: "watches",
    image: SmartWatches,
    bgColor: "#F5E6FF",
  },
];


////////bestseller dynamic data 

export const products = [
  {
    _id: "1",
    name: "Wireless Earbuds",
    category: "headphones",
    price: 2999,
    offerPrice: 1999,
    weight: "200g",
    image: ["https://images.pexels.com/photos/8858287/pexels-photo-8858287.jpeg"],
    rating: 4,
    description: ["High quality wireless earbuds with noise cancellation."],
    inStock: true,
  },
  {
    _id: "2",
    name: "Running Shoes",
    category: "Footwear",
    price: 4999,
    offerPrice: 3499,
    weight: "200g",
    image: ["https://images.pexels.com/photos/40662/shoes-footwear-hiking-shoes-walking-40662.jpeg"],
    rating: 3,
    description: ["Lightweight and comfortable running shoes."],
    inStock: true,
  },
  {
    _id:" 3",
    name: "Smartwatch",
    category: "watches",
    price: 8999,
    weight: "200g",
    offerPrice: 6999,
    image: ["https://images.pexels.com/photos/12955888/pexels-photo-12955888.jpeg"],
    rating: 5,
    description: ["Feature-packed smartwatch with health tracking."],
    inStock: false,
  },
  {
    _id: "4",
    name: "Backpack",
    category: "Accessories",
    weight: "200g",
    price: 1999,
    offerPrice: 1499,
    image: ["https://images.pexels.com/photos/2422476/pexels-photo-2422476.png"],
    rating: 4,
    description: ["Durable and spacious backpack for daily use."],
    inStock: true,
  },
  {
    _id: "5",
    name: "Sunglasses",
    category: "Accessories",
    weight: "200g",
    price: 1499,
    offerPrice: 999,
    image: ["https://images.pexels.com/photos/1342502/pexels-photo-1342502.jpeg"],
    rating: 3,
    description: ["UV protected stylish sunglasses."],
    inStock: true,
  },
]

//////// link section

export const linkSections = [
    {
        title: "Quick Links",
        links: [
            { txt: "Home", url: "/" },
            { txt: "Best Sellers", url: "/" },
            { txt: "Offers & Deals", url: "/" },
            { txt: "Contact Us", url: "/contact" },
            { txt: "FAQs", url: "/" },
        ]
    },
    {
        title: "Need Help?",
        links: [
            { txt: "Delivery Information", url: "/" },
            { txt: "Return & Refund Policy", url: "/" },
            { txt: "Payment Methods", url: "/" },
            { txt: "Track your Order", url: "/" },
            { txt: "Contact Us", url: "/contact" },
        ]
    },
    {
        title: "Follow Us",
        links: [
            { txt: "Instagram", url: "https://instagram.com" },
            { txt: "Twitter", url: "https://twitter.com" },
            { txt: "Facebook", url: "https://facebook.com" },
            { txt: "YouTube", url: "https://youtube.com" },
        ]
    }
];


///////dummy addrss 
 export const dummyAddress = [
    {
        _id: "1",
        name: "John Smith",
        street: "123 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "9876543210"
    },
    {
        _id: "2",
        name: "Priya Kumar",
        street: "456 Brigade Road",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        phone: "9123456789"
    },
    {
        _id: "3",
        name: "Rahul Sharma",
        street: "789 Park Street",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600001",
        phone: "9988776655"
    },
]

/////// dummy orders

export const dummyOrders = [
    {
        _id: "ORDER001",
        userId: "user1",
        items: [
            {
                product: {
                    _id: "1",
                    name: "Wireless Earbuds",
                    image: ["https://images.pexels.com/photos/8858287/pexels-photo-8858287.jpeg"],
                    category: "headphones",
                    offerPrice: 1999,
                },
                quantity: 2
            }
        ],
        amount: 4078,
        address: {
            FirstName: "John",
            LastName: "Smith",
            street: "123 MG Road",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            phone: "9876543210"
        },
        status: "Order Placed",
        paymentType: "COD",
        isPaid: false,
        createdAt: 1706537600000
    },
    {
        _id: "ORDER002",
        userId: "user1",
        items: [
            {
                product: {
                    _id: "3",
                    name: "Smartwatch",
                    image: ["https://images.pexels.com/photos/12955888/pexels-photo-12955888.jpeg"],
                    category: "watches",
                    offerPrice: 6999,
                },
                quantity: 1
            }
        ],
        amount: 7138,
        address: {
            FirstName: "John",
            LastName: "Smith",
            street: "123 MG Road",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            phone: "9876543210"
        },
        status: "Shipped",
        paymentType: "Online",
        isPaid: true,
        createdAt: 1706624000000
    },
    {
        _id: "ORDER003",
        userId: "user1",
        items: [
            {
                product: {
                    _id: "4",
                    name: "Bags",
                    image: ["https://images.pexels.com/photos/2422476/pexels-photo-2422476.png"],
                    category: "Bags",
                    offerPrice: 64999,
                },
                quantity: 1
            },
            {
                product: {
                    _id: "1",
                    name: "Wireless Earbuds",
                    image: ["https://images.pexels.com/photos/8858287/pexels-photo-8858287.jpeg"],
                    category: "headphones",
                    offerPrice: 1999,
                },
                quantity: 1
            }
        ],
        amount: 68318,
        address: {
            FirstName: "John",
            LastName: "Smith",
            street: "123 MG Road",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            phone: "9876543210"
        },
        status: "Delivered",
        paymentType: "Online",
        isPaid: true,
        createdAt: 1706710400000
    }
]