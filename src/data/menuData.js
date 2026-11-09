// Comprehensive 7-day Indian hostel mess menu database

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const MEAL_TYPES = [
  { id: 'breakfast', label: 'Breakfast', time: '07:30 AM – 09:30 AM', icon: 'Sunrise' },
  { id: 'lunch', label: 'Lunch', time: '12:30 PM – 02:30 PM', icon: 'Sun' },
  { id: 'snacks', label: 'Evening Snacks', time: '05:00 PM – 06:30 PM', icon: 'Coffee' },
  { id: 'dinner', label: 'Dinner', time: '08:00 PM – 10:00 PM', icon: 'Moon' },
];

export const WEEKLY_MENU = {
  Monday: {
    breakfast: {
      id: 'mon-breakfast',
      mealType: 'breakfast',
      day: 'Monday',
      title: 'Punjabi Aloo Paratha & Fresh Curd',
      tagline: 'Crisp golden parathas stuffed with spiced potatoes, served hot off the tawa.',
      time: '07:30 AM – 09:30 AM',
      category: 'North Indian',
      isVeg: true,
      hasEgg: false,
      rating: 4.6,
      reviewCount: 142,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Stuffed Aloo Paratha (2 pcs)', desc: 'Spiced Yukon gold potato mash with roasted cumin & coriander', isVeg: true, cal: '380 kcal' },
        { name: 'Homestyle Fresh Curd (Dahi)', desc: 'Creamy set curd sprinkled with roasted jeera powder', isVeg: true, cal: '110 kcal' },
        { name: 'Mixed Pickle & Salted Butter', desc: 'Spicy mango-lime pickle with dollop of Amul butter', isVeg: true, cal: '75 kcal' },
        { name: 'Cutting Masala Chai / Milk', desc: 'Ginger and cardamom infused hot brewed tea', isVeg: true, cal: '90 kcal' }
      ],
      highlights: ['Chef Special', 'Crowd Favorite', 'High Energy'],
      allergens: ['Dairy', 'Gluten']
    },
    lunch: {
      id: 'mon-lunch',
      mealType: 'lunch',
      day: 'Monday',
      title: 'Classic Rajma Masala & Steamed Basmati',
      tagline: 'Slow-simmered Kashmiri red kidney beans in aromatic onion-tomato gravy.',
      time: '12:30 PM – 02:30 PM',
      category: 'North Indian Classic',
      isVeg: true,
      hasEgg: false,
      rating: 4.5,
      reviewCount: 189,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Kashmiri Rajma Masala', desc: 'Slow-cooked red beans infused with whole spices and ginger', isVeg: true, cal: '240 kcal' },
        { name: 'Steamed Long Grain Basmati Rice', desc: 'Fluffy fragrant basmati rice', isVeg: true, cal: '210 kcal' },
        { name: 'Tawa Phulka Roti (3 pcs)', desc: 'Whole wheat soft puffed flatbreads with light ghee', isVeg: true, cal: '210 kcal' },
        { name: 'Boondi Raita & Kachumber Salad', desc: 'Chilled spiced yogurt with crisp boondi, onion-cucumber toss', isVeg: true, cal: '95 kcal' },
        { name: 'Roasted Lijjat Papad', desc: 'Crispy urad dal roasted papad', isVeg: true, cal: '45 kcal' }
      ],
      highlights: ['Comfort Food', 'High Protein', 'Rich Fiber'],
      allergens: ['Gluten', 'Dairy']
    },
    snacks: {
      id: 'mon-snacks',
      mealType: 'snacks',
      day: 'Monday',
      title: 'Bombay Veg Grilled Sandwich & Adrak Chai',
      tagline: 'Layers of beetroot, cucumber, potato, and spicy coriander mint chutney.',
      time: '05:00 PM – 06:30 PM',
      category: 'Street Snacks',
      isVeg: true,
      hasEgg: false,
      rating: 4.3,
      reviewCount: 98,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Bombay Veg Club Sandwich', desc: 'Toasted multi-tier bread with mint chutney, potato slice, cheese & veggies', isVeg: true, cal: '320 kcal' },
        { name: 'Hot Adrak-Elaichi Chai', desc: 'Fresh crushed ginger tea boiled to perfection', isVeg: true, cal: '85 kcal' },
        { name: 'Tomato Ketchup & Green Dip', desc: 'Tangy tomato dip and fresh mint-chili chutney', isVeg: true, cal: '30 kcal' }
      ],
      highlights: ['Crispy & Fresh', 'Quick Bite'],
      allergens: ['Gluten', 'Dairy']
    },
    dinner: {
      id: 'mon-dinner',
      mealType: 'dinner',
      day: 'Monday',
      title: 'Paneer Butter Masala & Dal Tadka Feast',
      tagline: 'Rich makhani gravy with tender cottage cheese cubes, yellow dal, and dessert.',
      time: '08:00 PM – 10:00 PM',
      category: 'Special Dinner',
      isVeg: true,
      hasEgg: false,
      rating: 4.7,
      reviewCount: 224,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Paneer Butter Masala', desc: 'Soft paneer cubes in velvety tomato cashew cream gravy', isVeg: true, cal: '340 kcal' },
        { name: 'Panchmel Dal Tadka', desc: 'Tempered five-lentil mix with cumin, garlic and dried red chilies', isVeg: true, cal: '180 kcal' },
        { name: 'Fragrant Jeera Rice', desc: 'Basmati rice tossed with roasted cumin seeds and fresh coriander', isVeg: true, cal: '220 kcal' },
        { name: 'Butter Tawa Rotis (4 pcs)', desc: 'Freshly tossed whole wheat rotis', isVeg: true, cal: '280 kcal' },
        { name: 'Hot Gulab Jamun (1 pc)', desc: 'Mawa dumpling dipped in aromatic cardamom saffron syrup', isVeg: true, cal: '175 kcal' }
      ],
      highlights: ['Sweet Included', 'Hostel Bestseller', 'Protein Rich'],
      allergens: ['Dairy', 'Nuts', 'Gluten']
    }
  },

  Tuesday: {
    breakfast: {
      id: 'tue-breakfast',
      mealType: 'breakfast',
      day: 'Tuesday',
      title: 'Indori Poha with Crisp Sev & Hot Jalebi',
      tagline: 'Steamed flattened rice tossed with peanuts, mustard seeds, curry leaves, and crunchy sev.',
      time: '07:30 AM – 09:30 AM',
      category: 'Central Indian',
      isVeg: true,
      hasEgg: false,
      rating: 4.4,
      reviewCount: 135,
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Indori Poha with Peanuts', desc: 'Fluffy beaten rice with turmeric, roasted peanuts and jeeravan masala', isVeg: true, cal: '280 kcal' },
        { name: 'Ratnami Sev & Fresh Pomegranate', desc: 'Spicy crisp chickpea flour garnish with sweet anar pearls', isVeg: true, cal: '90 kcal' },
        { name: 'Hot Crispy Jalebi (2 pcs)', desc: 'Traditional spiraled saffron sweet drenched in syrup', isVeg: true, cal: '190 kcal' },
        { name: 'Masala Chai / Coffee', desc: 'Strong ginger tea or filter coffee option', isVeg: true, cal: '80 kcal' }
      ],
      highlights: ['Light & Energizing', 'Sweet Included'],
      allergens: ['Peanuts', 'Gluten']
    },
    lunch: {
      id: 'tue-lunch',
      mealType: 'lunch',
      day: 'Tuesday',
      title: 'Punjabi Kadhi Pakora & Steamed Chawal',
      tagline: 'Tangy yogurt fenugreek curry loaded with soft onion pakoras and roasted papad.',
      time: '12:30 PM – 02:30 PM',
      category: 'Homestyle Comfort',
      isVeg: true,
      hasEgg: false,
      rating: 4.3,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Tangy Punjabi Kadhi Pakora', desc: 'Slow simmered besan yogurt curry tempered with rai and methi', isVeg: true, cal: '220 kcal' },
        { name: 'Steamed White Rice', desc: 'Hot boiled long grain rice', isVeg: true, cal: '200 kcal' },
        { name: 'Aloo Gobhi Adraki', desc: 'Dry spiced cauliflower and potato sabzi with julienned ginger', isVeg: true, cal: '160 kcal' },
        { name: 'Tawa Rotis (3 pcs)', desc: 'Fresh flatbreads', isVeg: true, cal: '210 kcal' },
        { name: 'Green Chilli Lemon Pickle', desc: 'Tangy traditional condiment', isVeg: true, cal: '25 kcal' }
      ],
      highlights: ['Homestyle Taste', 'Probiotic Yogurt'],
      allergens: ['Dairy', 'Gluten']
    },
    snacks: {
      id: 'tue-snacks',
      mealType: 'snacks',
      day: 'Tuesday',
      title: 'Crispy Samosa & Sweet Imli Chutney',
      tagline: 'Golden flaky pastry pockets stuffed with spiced peas and potatoes.',
      time: '05:00 PM – 06:30 PM',
      category: 'Street Classic',
      isVeg: true,
      hasEgg: false,
      rating: 4.8,
      reviewCount: 240,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Hot Samosa (2 pcs)', desc: 'Flaky pastry filled with spiced cumin potato & green peas', isVeg: true, cal: '360 kcal' },
        { name: 'Sonth & Mint Chutneys', desc: 'Tamarind jaggery sweet sonth dip with zesty mint coriander dip', isVeg: true, cal: '55 kcal' },
        { name: 'Cardamom Cutting Chai', desc: 'Special hosteller favorite hot tea', isVeg: true, cal: '85 kcal' }
      ],
      highlights: ['Hostel Sensation', 'Fried Treat'],
      allergens: ['Gluten']
    },
    dinner: {
      id: 'tue-dinner',
      mealType: 'dinner',
      day: 'Tuesday',
      title: 'Dum Aloo Kashmiri & Yellow Moong Dal',
      tagline: 'Baby potatoes simmered in rich Kashmiri fennel and dry ginger yogurt sauce.',
      time: '08:00 PM – 10:00 PM',
      category: 'North Indian',
      isVeg: true,
      hasEgg: false,
      rating: 4.2,
      reviewCount: 140,
      image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Dum Aloo Kashmiri', desc: 'Spiced baby potatoes in rich gravy flavored with saunf and sonth', isVeg: true, cal: '290 kcal' },
        { name: 'Yellow Moong Dal Fry', desc: 'Light yellow lentil soup tempered with ghee and cumin', isVeg: true, cal: '150 kcal' },
        { name: 'Peas Pulao', desc: 'Fragrant rice studded with tender green peas and whole cloves', isVeg: true, cal: '230 kcal' },
        { name: 'Tawa Chapati (4 pcs)', desc: 'Whole wheat chapatis', isVeg: true, cal: '280 kcal' },
        { name: 'Vanilla Ice Cream Cup', desc: 'Creamy cold dessert cup', isVeg: true, cal: '140 kcal' }
      ],
      highlights: ['Light on Stomach', 'Dessert Included'],
      allergens: ['Gluten', 'Dairy']
    }
  },

  Wednesday: {
    breakfast: {
      id: 'wed-breakfast',
      mealType: 'breakfast',
      day: 'Wednesday',
      title: 'Steamed Idli, Medu Vada & Sambhar',
      tagline: 'Piping hot fluffy rice cakes and crisp golden lentil donuts served with Madras sambhar.',
      time: '07:30 AM – 09:30 AM',
      category: 'South Indian Feast',
      isVeg: true,
      hasEgg: false,
      rating: 4.7,
      reviewCount: 198,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Steamed Rice Idlis (3 pcs)', desc: 'Naturally fermented fluffy steamed cakes', isVeg: true, cal: '190 kcal' },
        { name: 'Crispy Medu Vada (1 pc)', desc: 'Crunchy golden urad dal donut with peppercorns', isVeg: true, cal: '170 kcal' },
        { name: 'Drumstick Madras Sambhar', desc: 'Tangy tamarind lentil stew with shallots and moringa', isVeg: true, cal: '110 kcal' },
        { name: 'Coconut Chutney & Tomato Thokku', desc: 'Fresh grated coconut dip with spicy tempered red chutney', isVeg: true, cal: '90 kcal' },
        { name: 'South Indian Filter Coffee', desc: 'Frothy chicory blended aromatic coffee', isVeg: true, cal: '95 kcal' }
      ],
      highlights: ['Naturally Fermented', 'Gluten Free Option', 'High Protein'],
      allergens: ['Coconut']
    },
    lunch: {
      id: 'wed-lunch',
      mealType: 'lunch',
      day: 'Wednesday',
      title: 'Dal Makhani & Paneer Bhurji Combo',
      tagline: 'Overnight black lentils cooked with butter and cream paired with spiced crumbled cottage cheese.',
      time: '12:30 PM – 02:30 PM',
      category: 'North Indian Deluxe',
      isVeg: true,
      hasEgg: false,
      rating: 4.8,
      reviewCount: 265,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Slow-Cooked Dal Makhani', desc: 'Creamy black urad dal simmered with butter and tomato purée', isVeg: true, cal: '320 kcal' },
        { name: 'Dhabha Style Paneer Bhurji', desc: 'Crumbled cottage cheese sautéed with bell peppers and green chilies', isVeg: true, cal: '280 kcal' },
        { name: 'Butter Tawa Rotis (3 pcs)', desc: 'Fresh soft flatbreads brushed with butter', isVeg: true, cal: '230 kcal' },
        { name: 'Jeera Basmati Rice', desc: 'Fluffy cumin tempered rice', isVeg: true, cal: '210 kcal' },
        { name: 'Fresh Onion-Lemon Salad', desc: 'Sliced onions with chaat masala and green lemon', isVeg: true, cal: '30 kcal' }
      ],
      highlights: ['Super Hit', 'High Protein', 'Rich & Creamy'],
      allergens: ['Dairy', 'Gluten']
    },
    snacks: {
      id: 'wed-snacks',
      mealType: 'snacks',
      day: 'Wednesday',
      title: 'Crispy Bread Pakora & Mint Dip',
      tagline: 'Triangles of bread stuffed with zesty spiced potato filling and coated in gram flour.',
      time: '05:00 PM – 06:30 PM',
      category: 'Hostel Comfort',
      isVeg: true,
      hasEgg: false,
      rating: 4.4,
      reviewCount: 112,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Stuffed Bread Pakora (2 pcs)', desc: 'Gram flour batter fried bread with spiced potato coriander filling', isVeg: true, cal: '340 kcal' },
        { name: 'Pudina-Dhania Chutney', desc: 'Fresh garden mint and green chili sauce', isVeg: true, cal: '25 kcal' },
        { name: 'Adrak Masala Chai', desc: 'Spiced hot tea with ginger essence', isVeg: true, cal: '85 kcal' }
      ],
      highlights: ['Rainy Day Favorite', 'Crunchy'],
      allergens: ['Gluten']
    },
    dinner: {
      id: 'wed-dinner',
      mealType: 'dinner',
      day: 'Wednesday',
      title: 'Veg Hyderabadi Dum Biryani & Mirchi Salan',
      tagline: 'Fragrant basmati rice layered with marinated vegetables, paneer cubes, and saffron.',
      time: '08:00 PM – 10:00 PM',
      category: 'Royal Nizam',
      isVeg: true,
      hasEgg: false,
      rating: 4.9,
      reviewCount: 310,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Hyderabadi Dum Veg Biryani', desc: 'Slow handi cooked basmati layered with caramelized onions and saffron', isVeg: true, cal: '440 kcal' },
        { name: 'Hyderabadi Mirchi Ka Salan', desc: 'Traditional sesame, peanut and coconut spicy gravy', isVeg: true, cal: '190 kcal' },
        { name: 'Chilled Burani Raita', desc: 'Garlic-infused thick yogurt with roasted cumin', isVeg: true, cal: '110 kcal' },
        { name: 'Shahi Tukda (1 pc)', desc: 'Ghee fried crisp bread soaked in rabdi and garnished with pistachios', isVeg: true, cal: '210 kcal' }
      ],
      highlights: ['Top Rated Meal', 'Royal Feast', 'Special Dessert'],
      allergens: ['Dairy', 'Nuts', 'Peanuts', 'Gluten']
    }
  },

  Thursday: {
    breakfast: {
      id: 'thu-breakfast',
      mealType: 'breakfast',
      day: 'Thursday',
      title: 'Puri Bhaji with Sooji Halwa',
      tagline: 'Puffed golden whole wheat puris served with spicy aloo rassa and warm semolina pudding.',
      time: '07:30 AM – 09:30 AM',
      category: 'North Indian Fest',
      isVeg: true,
      hasEgg: false,
      rating: 4.6,
      reviewCount: 175,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Crispy Puffed Puris (4 pcs)', desc: 'Golden fried whole wheat puffed breads', isVeg: true, cal: '360 kcal' },
        { name: 'Halwai Style Aloo Tamatar Sabzi', desc: 'Crushed potatoes in spicy tangy tomato ginger gravy', isVeg: true, cal: '210 kcal' },
        { name: 'Desi Ghee Sooji Halwa', desc: 'Semolina sweet roasted in pure ghee with cashews and raisins', isVeg: true, cal: '240 kcal' },
        { name: 'Hot Spiced Tea', desc: 'Rich cardamom milk tea', isVeg: true, cal: '85 kcal' }
      ],
      highlights: ['Sweet & Savory', 'Heavy Breakfast'],
      allergens: ['Gluten', 'Dairy', 'Nuts']
    },
    lunch: {
      id: 'thu-lunch',
      mealType: 'lunch',
      day: 'Thursday',
      title: 'Dhaba Chana Masala & Jeera Pulao',
      tagline: 'Tender chickpeas simmered in roasted spices, anardana, and fragrant coriander.',
      time: '12:30 PM – 02:30 PM',
      category: 'Punjabi Dhaba',
      isVeg: true,
      hasEgg: false,
      rating: 4.4,
      reviewCount: 148,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Amritsari Chana Masala', desc: 'Dark spiced chickpeas with ginger juliennes and green chilies', isVeg: true, cal: '270 kcal' },
        { name: 'Fragrant Jeera Pulao', desc: 'Cumin flavored basmati rice with bay leaves', isVeg: true, cal: '220 kcal' },
        { name: 'Soft Tawa Phulkas (3 pcs)', desc: 'Homestyle wheat flatbreads', isVeg: true, cal: '210 kcal' },
        { name: 'Cucumber Mint Raita', desc: 'Cooling yogurt dip with diced cucumbers', isVeg: true, cal: '80 kcal' },
        { name: 'Crisp Papad & Mango Pickle', desc: 'Side accompaniments', isVeg: true, cal: '50 kcal' }
      ],
      highlights: ['Plant Protein', 'High Fiber'],
      allergens: ['Gluten', 'Dairy']
    },
    snacks: {
      id: 'thu-snacks',
      mealType: 'snacks',
      day: 'Thursday',
      title: 'Pav Bhaji with Butter Toasted Pav',
      tagline: 'Mashed spiced mixed vegetables cooked on large tawa with dollops of fresh butter.',
      time: '05:00 PM – 06:30 PM',
      category: 'Street Legend',
      isVeg: true,
      hasEgg: false,
      rating: 4.8,
      reviewCount: 280,
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Special Mumbai Pav Bhaji', desc: 'Rich mashed potatoes, cauliflower, peas, tomatoes and butter', isVeg: true, cal: '380 kcal' },
        { name: 'Butter Glazed Pav (2 pairs)', desc: 'Soft bakery buns toasted with Amul butter', isVeg: true, cal: '260 kcal' },
        { name: 'Finely Chopped Onion & Lemon', desc: 'Fresh red onion relish with wedge of lemon', isVeg: true, cal: '20 kcal' },
        { name: 'Nimbu Pani / Chai', desc: 'Fresh sweet & salt lemonade or hot tea', isVeg: true, cal: '70 kcal' }
      ],
      highlights: ['Massive Hit', 'Comfort Food'],
      allergens: ['Dairy', 'Gluten']
    },
    dinner: {
      id: 'thu-dinner',
      mealType: 'dinner',
      day: 'Thursday',
      title: 'Malai Kofta & Mixed Seasonal Sabzi',
      tagline: 'Paneer and potato dumplings in cashew onion sauce paired with fresh sautéed vegetables.',
      time: '08:00 PM – 10:00 PM',
      category: 'Mughlai Delight',
      isVeg: true,
      hasEgg: false,
      rating: 4.5,
      reviewCount: 165,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Royal Malai Kofta', desc: 'Paneer-potato stuffed dumplings simmered in creamy golden gravy', isVeg: true, cal: '360 kcal' },
        { name: 'Mix Seasonal Vegetable Sabzi', desc: 'Beans, carrots, peas, and bell pepper tossed in mild spices', isVeg: true, cal: '140 kcal' },
        { name: 'Arhar Dal Fry', desc: 'Yellow pigeon pea dal tempered with hing and garlic', isVeg: true, cal: '160 kcal' },
        { name: 'Steamed Rice & Rotis (4 pcs)', desc: 'Carb balance with rice and fresh wheat rotis', isVeg: true, cal: '320 kcal' },
        { name: 'Bengali Spongy Rasgulla (1 pc)', desc: 'Syrupy fresh cottage cheese ball', isVeg: true, cal: '130 kcal' }
      ],
      highlights: ['Rich Gravy', 'Sweet Included'],
      allergens: ['Dairy', 'Nuts', 'Gluten']
    }
  },

  Friday: {
    breakfast: {
      id: 'fri-breakfast',
      mealType: 'breakfast',
      day: 'Friday',
      title: 'Crispy Masala Dosa & Sambar',
      tagline: 'Paper-thin golden fermented crepe folded over spiced mustard potato masala.',
      time: '07:30 AM – 09:30 AM',
      category: 'South Indian Special',
      isVeg: true,
      hasEgg: false,
      rating: 4.8,
      reviewCount: 230,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Crispy Golden Masala Dosa', desc: 'Thin fermented rice-lentil crepe with potato onion roast', isVeg: true, cal: '320 kcal' },
        { name: 'Vegetable Sambar', desc: 'Hot aromatic lentil soup with drumsticks and tomatoes', isVeg: true, cal: '100 kcal' },
        { name: 'Coconut Chutney & Red Chilly Podi', desc: 'Fresh grated coconut dip with spicy gun powder & ghee', isVeg: true, cal: '110 kcal' },
        { name: 'Hot Filter Coffee / Tea', desc: 'Fresh decoction brew', isVeg: true, cal: '85 kcal' }
      ],
      highlights: ['Weekend Eve Special', 'Super Crispy'],
      allergens: ['Coconut']
    },
    lunch: {
      id: 'fri-lunch',
      mealType: 'lunch',
      day: 'Friday',
      title: 'South Indian Thali: Sambar, Rasam & Kootu',
      tagline: 'Wholesome balanced South Indian lunch with peppery rasam and crispy appalam.',
      time: '12:30 PM – 02:30 PM',
      category: 'Traditional South',
      isVeg: true,
      hasEgg: false,
      rating: 4.3,
      reviewCount: 130,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Udupi Mixed Veg Sambar', desc: 'Lentils cooked with ash gourd, carrots and fresh ground sambar paste', isVeg: true, cal: '140 kcal' },
        { name: 'Tomato Pepper Rasam', desc: 'Tangy digestive soup with crushed black pepper and cumin', isVeg: true, cal: '60 kcal' },
        { name: 'Cabbage Chana Dal Kootu', desc: 'Mild coconut lentil vegetable medley', isVeg: true, cal: '130 kcal' },
        { name: 'Boiled Ponni Rice', desc: 'Hot traditional South Indian meal rice', isVeg: true, cal: '220 kcal' },
        { name: 'Crisp Fried Appalam & Curd', desc: 'Crunchy poppadom with chilled curd cup', isVeg: true, cal: '120 kcal' }
      ],
      highlights: ['Light & Digestive', 'Traditional'],
      allergens: ['Dairy', 'Coconut']
    },
    snacks: {
      id: 'fri-snacks',
      mealType: 'snacks',
      day: 'Friday',
      title: 'Spicy Maggi Masala & Hot Coffee',
      tagline: 'College hostel classic: 2-minute noodles cooked with sautéed veggies and secret spice mix.',
      time: '05:00 PM – 06:30 PM',
      category: 'Hostel Nostalgia',
      isVeg: true,
      hasEgg: false,
      rating: 4.9,
      reviewCount: 340,
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Hostel Style Veggie Maggi', desc: 'Two bricks tossed with onions, peas, green chilies and butter', isVeg: true, cal: '390 kcal' },
        { name: 'Hot Nescafe Coffee', desc: 'Frothy beaten instant coffee with milk', isVeg: true, cal: '110 kcal' },
        { name: 'Marie Biscuits (2 pcs)', desc: 'Crunchy tea accompaniment', isVeg: true, cal: '60 kcal' }
      ],
      highlights: ['All-Time Favorite', 'Comfort Max'],
      allergens: ['Gluten', 'Dairy']
    },
    dinner: {
      id: 'fri-dinner',
      mealType: 'dinner',
      day: 'Friday',
      title: 'Shahi Paneer, Dal Makhani & Garlic Naan',
      tagline: 'Weekend celebration dinner with royal white cashew gravy, slow dal, and hot bread.',
      time: '08:00 PM – 10:00 PM',
      category: 'Friday Special Gala',
      isVeg: true,
      hasEgg: false,
      rating: 4.9,
      reviewCount: 380,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Rich Shahi Paneer', desc: 'Cottage cheese steeped in cardamom-scented white cashew and almond gravy', isVeg: true, cal: '380 kcal' },
        { name: 'Overnight Simmered Dal Makhani', desc: 'Silky buttery black lentils', isVeg: true, cal: '290 kcal' },
        { name: 'Butter Garlic Naan (2 pcs)', desc: 'Tandoor-baked flatbread glazed with garlic butter', isVeg: true, cal: '310 kcal' },
        { name: 'Peas Pulao & Onion Rings', desc: 'Spiced rice with crisp salad', isVeg: true, cal: '200 kcal' },
        { name: 'Moong Dal Halwa', desc: 'Decadent slow-roasted lentil sweet with pure desi ghee', isVeg: true, cal: '260 kcal' }
      ],
      highlights: ['Friday Feast', 'Gourmet Desserts', 'High Demand'],
      allergens: ['Dairy', 'Nuts', 'Gluten']
    }
  },

  Saturday: {
    breakfast: {
      id: 'sat-breakfast',
      mealType: 'breakfast',
      day: 'Saturday',
      title: 'Delhi Style Chole Bhature & Sweet Lassi',
      tagline: 'Giant puffed balloon bhaturas with dark spicy pindi chole and chilled lassi.',
      time: '07:30 AM – 09:30 AM',
      category: 'Delhi Street Classic',
      isVeg: true,
      hasEgg: false,
      rating: 4.9,
      reviewCount: 312,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Crispy Puffed Bhature (2 pcs)', desc: 'Fermented golden fried puffed bread', isVeg: true, cal: '420 kcal' },
        { name: 'Amritsari Pindi Chole', desc: 'Tea leaf boiled dark chickpeas infused with roasted spices & ginger', isVeg: true, cal: '290 kcal' },
        { name: 'Pickled Onion, Green Chili & Achar', desc: 'Spicy vinegar onions and stuffed green chili', isVeg: true, cal: '35 kcal' },
        { name: 'Chilled Sweet Lassi', desc: 'Thick churned yogurt drink with malai top', isVeg: true, cal: '180 kcal' }
      ],
      highlights: ['Saturday Special', 'Heavy Brunch', 'Student Favorite'],
      allergens: ['Gluten', 'Dairy']
    },
    lunch: {
      id: 'sat-lunch',
      mealType: 'lunch',
      day: 'Saturday',
      title: 'Khichdi, Baingan Bharta & Curd',
      tagline: 'Light Saturday lunch: nourishing Moong Dal Khichdi topped with ghee, smoked eggplant and dahi.',
      time: '12:30 PM – 02:30 PM',
      category: 'Detox Comfort',
      isVeg: true,
      hasEgg: false,
      rating: 4.1,
      reviewCount: 95,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Desi Ghee Moong Dal Khichdi', desc: 'Comforting blend of rice and yellow lentils with mild cumin tempering', isVeg: true, cal: '280 kcal' },
        { name: 'Dhungar Smoked Baingan Bharta', desc: 'Charcoal roasted eggplant mashed with onions, tomatoes and peas', isVeg: true, cal: '160 kcal' },
        { name: 'Fresh Dahi & Fried Papad', desc: 'Creamy yogurt cup with crisp papad', isVeg: true, cal: '120 kcal' },
        { name: 'Aam Ka Achar', desc: 'Spicy mango pickle', isVeg: true, cal: '25 kcal' }
      ],
      highlights: ['Light on Stomach', 'Easily Digestible', 'Weekend Recovery'],
      allergens: ['Dairy']
    },
    snacks: {
      id: 'sat-snacks',
      mealType: 'snacks',
      day: 'Saturday',
      title: 'Crispy Onion Pakoda & Filter Kaapi',
      tagline: 'Golden crunchy batter-fried sliced onion fritters with red garlic and green mint chutneys.',
      time: '05:00 PM – 06:30 PM',
      category: 'Evening Teatime',
      isVeg: true,
      hasEgg: false,
      rating: 4.5,
      reviewCount: 165,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Crunchy Kanda Bhaji / Pakoda', desc: 'Crispy spiced sliced onions in seasoned chickpea flour', isVeg: true, cal: '310 kcal' },
        { name: 'Lahsuni Red Chutney', desc: 'Zesty garlic and chili dip', isVeg: true, cal: '30 kcal' },
        { name: 'Strong Hot Filter Coffee', desc: 'Fresh South Indian decoction coffee', isVeg: true, cal: '90 kcal' }
      ],
      highlights: ['Super Crunchy', 'Teatime Special'],
      allergens: []
    },
    dinner: {
      id: 'sat-dinner',
      mealType: 'dinner',
      day: 'Saturday',
      title: 'Tandoori Roti, Soya Chaap Curry & Dal Tadka',
      tagline: 'Rich grilled soya chaap in roasted masala gravy with smoky yellow dal and hot rotis.',
      time: '08:00 PM – 10:00 PM',
      category: 'North Indian Feast',
      isVeg: true,
      hasEgg: false,
      rating: 4.4,
      reviewCount: 182,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Masaledar Soya Chaap Tikka Gravy', desc: 'Juicy soybean chunks cooked in tandoori onion-tomato masala', isVeg: true, cal: '330 kcal' },
        { name: 'Double Tadka Yellow Dal', desc: 'Toor dal tempered with desi ghee, garlic, and dried red chilies', isVeg: true, cal: '170 kcal' },
        { name: 'Tandoori Whole Wheat Rotis (3 pcs)', desc: 'Clay oven baked crisp rotis with butter', isVeg: true, cal: '240 kcal' },
        { name: 'Steamed Basmati Rice', desc: 'Fluffy rice bowl', isVeg: true, cal: '200 kcal' },
        { name: 'Hot Kala Jamun', desc: 'Deep roasted milk confection in rose syrup', isVeg: true, cal: '180 kcal' }
      ],
      highlights: ['High Vegetarian Protein', 'Smoky Flavors'],
      allergens: ['Soy', 'Dairy', 'Gluten']
    }
  },

  Sunday: {
    breakfast: {
      id: 'sun-breakfast',
      mealType: 'breakfast',
      day: 'Sunday',
      title: 'Upma, Medu Vada & Coconut Chutney',
      tagline: 'Roasted semolina upma with cashews, ginger and vegetables served with crispy lentil vadas.',
      time: '07:30 AM – 09:30 AM',
      category: 'South Indian Comfort',
      isVeg: true,
      hasEgg: false,
      rating: 4.3,
      reviewCount: 120,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Vegetable Cashew Rava Upma', desc: 'Tempered semolina with mustard seeds, curry leaves, veggies & roasted cashews', isVeg: true, cal: '240 kcal' },
        { name: 'Golden Medu Vada (2 pcs)', desc: 'Crisp donut fritters made from spiced black gram batter', isVeg: true, cal: '260 kcal' },
        { name: 'Fresh Coconut Chutney & Sambhar', desc: 'White coconut dip with piping hot drumstick sambhar', isVeg: true, cal: '130 kcal' },
        { name: 'Hot Chai / Coffee', desc: 'Fresh brewed beverage', isVeg: true, cal: '80 kcal' }
      ],
      highlights: ['Sunday Morning Light', 'Crunchy Vadas'],
      allergens: ['Nuts', 'Gluten', 'Coconut']
    },
    lunch: {
      id: 'sun-lunch',
      mealType: 'lunch',
      day: 'Sunday',
      title: 'Sunday Special Dum Biryani & Chicken / Paneer Option',
      tagline: 'The biggest mess meal of the week! Long-grain aromatic dum biryani with salan and raita.',
      time: '12:30 PM – 02:30 PM',
      category: 'Grand Sunday Feast',
      isVeg: false, // Non-veg & veg counter separation
      hasEgg: true,
      rating: 4.9,
      reviewCount: 410,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Sunday Special Dum Biryani', desc: 'Choice of Paneer Tikka Dum Biryani (Veg) or Hyderabadi Chicken Biryani', isVeg: false, cal: '480 kcal' },
        { name: 'Mirchi Ka Salan', desc: 'Spiced peanut, sesame, and green chili gravy', isVeg: true, cal: '180 kcal' },
        { name: 'Boondi Raita & Laccha Onion', desc: 'Cool yogurt with crisp boondi, lemon-chilli onion relish', isVeg: true, cal: '110 kcal' },
        { name: 'Boiled Egg (Optional)', desc: 'Protein side for non-veg counter', isVeg: false, cal: '75 kcal' },
        { name: 'Cold Kheer / Ice Cream Cup', desc: 'Sweet end to Sunday lunch', isVeg: true, cal: '180 kcal' }
      ],
      highlights: ['Highest Attendance', 'Grand Sunday Lunch', 'Separate Veg Counter'],
      allergens: ['Dairy', 'Nuts', 'Peanuts', 'Eggs']
    },
    snacks: {
      id: 'sun-snacks',
      mealType: 'snacks',
      day: 'Sunday',
      title: 'Kolkata Kathi Roll & Lemon Iced Tea',
      tagline: 'Flaky paratha wrap stuffed with marinated paneer/egg, onions, and tangy chaat masala.',
      time: '05:00 PM – 06:30 PM',
      category: 'Street Wrap',
      isVeg: true,
      hasEgg: false,
      rating: 4.6,
      reviewCount: 195,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Paneer / Veg Kathi Roll', desc: 'Tawa paratha rolled with seasoned paneer, shredded cabbage, onions & mint sauce', isVeg: true, cal: '340 kcal' },
        { name: 'Chilled Lemon Iced Tea', desc: 'Cooling citrus iced beverage with mint leaves', isVeg: true, cal: '70 kcal' }
      ],
      highlights: ['Grab & Go', 'Hostel Special'],
      allergens: ['Gluten', 'Dairy']
    },
    dinner: {
      id: 'sun-dinner',
      mealType: 'dinner',
      day: 'Sunday',
      title: 'Matar Paneer, Dal Makhani & Jeera Rice',
      tagline: 'Warm comforting finish to the weekend with rich cottage cheese peas curry and soft rotis.',
      time: '08:00 PM – 10:00 PM',
      category: 'Homestyle Comfort',
      isVeg: true,
      hasEgg: false,
      rating: 4.4,
      reviewCount: 170,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Matar Paneer Masala', desc: 'Fresh green peas and soft paneer in spiced onion tomato gravy', isVeg: true, cal: '320 kcal' },
        { name: 'Dal Fry with Desi Ghee', desc: 'Yellow lentils with garlic, green chilies and fresh cilantro', isVeg: true, cal: '170 kcal' },
        { name: 'Steamed Jeera Rice', desc: 'Cumin flavored rice', isVeg: true, cal: '210 kcal' },
        { name: 'Tawa Phulkas (3 pcs)', desc: 'Warm whole wheat rotis', isVeg: true, cal: '210 kcal' },
        { name: 'Sweet Suji Halwa / Gulab Jamun', desc: 'Comfort dessert', isVeg: true, cal: '160 kcal' }
      ],
      highlights: ['Light & Wholesome', 'Sunday Finale'],
      allergens: ['Dairy', 'Gluten']
    }
  }
};

// Helper: Get day name from date string or Date object
export const getDayName = (dateOrStr) => {
  const date = typeof dateOrStr === 'string' ? new Date(dateOrStr) : dateOrStr;
  const dayIndex = date.getDay(); // 0 is Sunday, 1 is Monday...
  const mapping = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return mapping[dayIndex] || 'Monday';
};

// Get today's ISO date string (YYYY-MM-DD)
export const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get menu for a specific day
export const getMenuForDay = (dayName) => {
  return WEEKLY_MENU[dayName] || WEEKLY_MENU['Monday'];
};

// Get hostel options list
export const HOSTEL_OPTIONS = [
  { id: 'h1', name: 'Aryabhata Hall of Residence (Boys)', mess: 'Central Food Court (Royal Feast)', capacity: 520, students: 512 },
  { id: 'h2', name: 'Gargi Hall of Residence (Girls)', mess: 'North Block Mess (Annapurna Caterers)', capacity: 480, students: 465 },
  { id: 'h3', name: 'Bhaskara Mega Mess (Combined)', mess: 'Mega Dining Hall 1 (Sodexo Campus)', capacity: 650, students: 630 },
  { id: 'h4', name: 'CV Raman Hostel (PG / PhD)', mess: 'East Campus Mess (Green Gourmet)', capacity: 410, students: 395 },
];

