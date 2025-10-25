export interface WordData {
  word: string;
  hints: {
    easy: string;
    medium: string;
    hard: string;
  };
}

export type HintDifficulty = 'easy' | 'medium' | 'hard';

export interface WordsByCategory {
  [category: string]: WordData[];
}

export const WORDS_BY_CATEGORY: WordsByCategory = {
  'Bollywood Movies': [
    { 
      word: 'Dilwale Dulhania Le Jayenge', 
      hints: {
        easy: 'King of Romance',
        medium: 'Shah Rukh Khan movie',
        hard: 'DDLJ'
      }
    },
    { 
      word: 'Sholay', 
      hints: {
        easy: 'Gabbar Singh',
        medium: 'Classic Bollywood',
        hard: 'Amitabh Bachchan movie'
      }
    },
    { 
      word: 'Lagaan', 
      hints: {
        easy: 'Cricket in British India',
        medium: 'Aamir Khan movie',
        hard: 'Oscar nominated'
      }
    },
    { 
      word: '3 Idiots', 
      hints: {
        easy: 'Engineering College',
        medium: 'Aamir Khan comedy',
        hard: 'Five Point Someone'
      }
    },
    { 
      word: 'Dangal', 
      hints: {
        easy: 'Wrestling Sisters',
        medium: 'Aamir Khan sports movie',
        hard: 'Geeta Phogat'
      }
    },
    { 
      word: 'PK', 
      hints: {
        easy: 'Alien in India',
        medium: 'Aamir Khan sci-fi',
        hard: 'Rajkumar Hirani'
      }
    },
    { 
      word: 'Bahubali', 
      hints: {
        easy: 'Epic War Movie',
        medium: 'South Indian blockbuster',
        hard: 'SS Rajamouli'
      }
    },
    { 
      word: 'Queen', 
      hints: {
        easy: 'Solo Honeymoon',
        medium: 'Kangana Ranaut movie',
        hard: 'Vikas Bahl'
      }
    },
    { 
      word: 'Zindagi Na Milegi Dobara', 
      hints: {
        easy: 'Road Trip Spain',
        medium: 'Hrithik Roshan movie',
        hard: 'Zoya Akhtar'
      }
    },
    { 
      word: 'Yeh Jawaani Hai Deewani', 
      hints: {
        easy: 'Mountain Adventure',
        medium: 'Ranbir Kapoor movie',
        hard: 'Ayan Mukerji'
      }
    }
  ],
  'Food': [
    { 
      word: 'Biryani', 
      hints: {
        easy: 'Rice with Meat',
        medium: 'Indian rice dish',
        hard: 'Mughlai cuisine'
      }
    },
    { 
      word: 'Samosa', 
      hints: {
        easy: 'Triangular Snack',
        medium: 'Fried pastry',
        hard: 'Potato filling'
      }
    },
    { 
      word: 'Butter Chicken', 
      hints: {
        easy: 'Creamy Tomato Curry',
        medium: 'North Indian curry',
        hard: 'Murg Makhani'
      }
    },
    { 
      word: 'Masala Dosa', 
      hints: {
        easy: 'South Indian Crepe',
        medium: 'Rice pancake',
        hard: 'Fermented batter'
      }
    },
    { 
      word: 'Rajma Chawal', 
      hints: {
        easy: 'Red Beans Rice',
        medium: 'Kidney beans curry',
        hard: 'Punjabi comfort food'
      }
    },
    { 
      word: 'Chole Bhature', 
      hints: {
        easy: 'Chickpeas with Fried Bread',
        medium: 'Chickpea curry',
        hard: 'Punjabi breakfast'
      }
    },
    { 
      word: 'Pizza', 
      hints: {
        easy: 'Italian Flatbread',
        medium: 'Cheese and toppings',
        hard: 'Margherita'
      }
    },
    { 
      word: 'Pasta', 
      hints: {
        easy: 'Italian Noodles',
        medium: 'Wheat noodles',
        hard: 'Spaghetti'
      }
    },
    { 
      word: 'Burger', 
      hints: {
        easy: 'Meat in Bun',
        medium: 'Sandwich with patty',
        hard: 'Hamburger'
      }
    },
    { 
      word: 'Sandwich', 
      hints: {
        easy: 'Filling between Bread',
        medium: 'Two slices of bread',
        hard: 'Club sandwich'
      }
    }
  ],
  'Cricket': [
    { 
      word: 'Sachin Tendulkar', 
      hints: {
        easy: 'Master Blaster',
        medium: 'Cricket legend',
        hard: 'Little Master'
      }
    },
    { 
      word: 'Virat Kohli', 
      hints: {
        easy: 'Run Machine',
        medium: 'Indian captain',
        hard: 'King Kohli'
      }
    },
    { 
      word: 'MS Dhoni', 
      hints: {
        easy: 'Captain Cool',
        medium: 'Former captain',
        hard: 'Thala'
      }
    },
    { 
      word: 'IPL', 
      hints: {
        easy: 'T20 League',
        medium: 'Cricket tournament',
        hard: 'Indian Premier League'
      }
    },
    { 
      word: 'Test Match', 
      hints: {
        easy: '5 Day Game',
        medium: 'Long format',
        hard: 'Traditional cricket'
      }
    },
    { 
      word: 'Sixer', 
      hints: {
        easy: 'Boundary Over Rope',
        medium: 'Six runs',
        hard: 'Maximum'
      }
    },
    { 
      word: 'Wicket', 
      hints: {
        easy: 'Stumps Fall',
        medium: 'Out',
        hard: 'Dismissal'
      }
    },
    { 
      word: 'Bowler', 
      hints: {
        easy: 'Throws the Ball',
        medium: 'Ball delivery',
        hard: 'Pace/Spin'
      }
    },
    { 
      word: 'Batsman', 
      hints: {
        easy: 'Hits the Ball',
        medium: 'Batting player',
        hard: 'Striker'
      }
    },
    { 
      word: 'Umpire', 
      hints: {
        easy: 'Game Judge',
        medium: 'Match official',
        hard: 'Decision maker'
      }
    }
  ],
  'Cities': [
    { 
      word: 'Mumbai', 
      hints: {
        easy: 'City of Dreams',
        medium: 'Financial capital of India',
        hard: 'Gateway of India'
      }
    },
    { 
      word: 'Delhi', 
      hints: {
        easy: 'Capital of India',
        medium: 'Red Fort city',
        hard: 'New Delhi'
      }
    },
    { 
      word: 'Bangalore', 
      hints: {
        easy: 'Silicon Valley',
        medium: 'IT capital of India',
        hard: 'Garden City'
      }
    },
    { 
      word: 'Chennai', 
      hints: {
        easy: 'Auto Capital',
        medium: 'Auto Capital (medium)',
        hard: 'Auto Capital (hard)'
      }
    },
    { 
      word: 'Kolkata', 
      hints: {
        easy: 'City of Joy',
        medium: 'City of Joy (medium)',
        hard: 'City of Joy (hard)'
      }
    },
    { 
      word: 'Pune', 
      hints: {
        easy: 'Oxford of East',
        medium: 'Oxford of East (medium)',
        hard: 'Oxford of East (hard)'
      }
    },
    { 
      word: 'Hyderabad', 
      hints: {
        easy: 'City of Pearls',
        medium: 'City of Pearls (medium)',
        hard: 'City of Pearls (hard)'
      }
    },
    { 
      word: 'Ahmedabad', 
      hints: {
        easy: 'Manchester of India',
        medium: 'Manchester of India (medium)',
        hard: 'Manchester of India (hard)'
      }
    },
    { 
      word: 'Jaipur', 
      hints: {
        easy: 'Pink City',
        medium: 'Pink City (medium)',
        hard: 'Pink City (hard)'
      }
    },
    { 
      word: 'Kochi', 
      hints: {
        easy: 'Queen of Arabian Sea',
        medium: 'Queen of Arabian Sea (medium)',
        hard: 'Queen of Arabian Sea (hard)'
      }
    }
  ],
  'Festivals': [
    { 
      word: 'Diwali', 
      hints: {
        easy: 'Festival of Lights',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Holi', 
      hints: {
        easy: 'Festival of Colors',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Dussehra', 
      hints: {
        easy: 'Victory of Good',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Eid', 
      hints: {
        easy: 'Muslim Festival',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Christmas', 
      hints: {
        easy: 'Birth of Jesus',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Ganesh Chaturthi', 
      hints: {
        easy: 'Elephant God',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Navratri', 
      hints: {
        easy: 'Nine Nights',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Karva Chauth', 
      hints: {
        easy: 'Wife Fasts for Husband',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Raksha Bandhan', 
      hints: {
        easy: 'Brother Sister Bond',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Janmashtami', 
      hints: {
        easy: 'Birth of Krishna',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    }
  ],
  'Sweets': [
    { 
      word: 'Gulab Jamun', 
      hints: {
        easy: 'Milk Balls in Syrup',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    },
    { 
      word: 'Jalebi', 
      hints: {
        easy: 'Orange Swirls',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    },
    { 
      word: 'Rasgulla', 
      hints: {
        easy: 'White Spongy Balls',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    },
    { 
      word: 'Laddu', 
      hints: {
        easy: 'Round Sweet Balls',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    },
    { 
      word: 'Barfi', 
      hints: {
        easy: 'Milk Fudge',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    },
    { 
      word: 'Kheer', 
      hints: {
        easy: 'Rice Pudding',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    },
    { 
      word: 'Halwa', 
      hints: {
        easy: 'Semolina Sweet',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    },
    { 
      word: 'Pedha', 
      hints: {
        easy: 'Milk Sweet',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    },
    { 
      word: 'Kulfi', 
      hints: {
        easy: 'Indian Ice Cream',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    },
    { 
      word: 'Ras Malai', 
      hints: {
        easy: 'Cottage Cheese in Milk',
        medium: 'Indian dessert',
        hard: 'Traditional sweet'
      }
    }
  ],
  'Bollywood Actors': [
    { 
      word: 'Amitabh Bachchan', 
      hints: {
        easy: 'Big B',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    },
    { 
      word: 'Shah Rukh Khan', 
      hints: {
        easy: 'King Khan',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    },
    { 
      word: 'Aamir Khan', 
      hints: {
        easy: 'Perfectionist',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    },
    { 
      word: 'Salman Khan', 
      hints: {
        easy: 'Bhai',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    },
    { 
      word: 'Deepika Padukone', 
      hints: {
        easy: 'Piku Star',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    },
    { 
      word: 'Priyanka Chopra', 
      hints: {
        easy: 'Global Icon',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    },
    { 
      word: 'Ranbir Kapoor', 
      hints: {
        easy: 'Animal Star',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    },
    { 
      word: 'Alia Bhatt', 
      hints: {
        easy: 'Student of Year',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    },
    { 
      word: 'Ranveer Singh', 
      hints: {
        easy: 'Bajirao Star',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    },
    { 
      word: 'Kareena Kapoor', 
      hints: {
        easy: 'Poo',
        medium: 'Famous actor',
        hard: 'Bollywood star'
      }
    }
  ],
  'States': [
    { 
      word: 'Maharashtra', 
      hints: {
        easy: 'Mumbai State',
        medium: 'Indian state',
        hard: 'State in India'
      }
    },
    { 
      word: 'Tamil Nadu', 
      hints: {
        easy: 'Chennai State',
        medium: 'Indian state',
        hard: 'State in India'
      }
    },
    { 
      word: 'Gujarat', 
      hints: {
        easy: 'Modi State',
        medium: 'Indian state',
        hard: 'State in India'
      }
    },
    { 
      word: 'Rajasthan', 
      hints: {
        easy: 'Desert State',
        medium: 'Indian state',
        hard: 'State in India'
      }
    },
    { 
      word: 'Kerala', 
      hints: {
        easy: 'God Own Country',
        medium: 'Indian state',
        hard: 'State in India'
      }
    },
    { 
      word: 'Punjab', 
      hints: {
        easy: 'Golden Temple State',
        medium: 'Indian state',
        hard: 'State in India'
      }
    },
    { 
      word: 'Karnataka', 
      hints: {
        easy: 'Bangalore State',
        medium: 'Indian state',
        hard: 'State in India'
      }
    },
    { 
      word: 'West Bengal', 
      hints: {
        easy: 'Kolkata State',
        medium: 'Indian state',
        hard: 'State in India'
      }
    },
    { 
      word: 'Andhra Pradesh', 
      hints: {
        easy: 'Hyderabad State',
        medium: 'Indian state',
        hard: 'State in India'
      }
    },
    { 
      word: 'Uttar Pradesh', 
      hints: {
        easy: 'Largest State',
        medium: 'Indian state',
        hard: 'State in India'
      }
    }
  ],
  'Street Food': [
    { 
      word: 'Vada Pav', 
      hints: {
        easy: 'Mumbai Burger',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    },
    { 
      word: 'Pani Puri', 
      hints: {
        easy: 'Water Balls',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    },
    { 
      word: 'Chaat', 
      hints: {
        easy: 'Tangy Snack',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    },
    { 
      word: 'Bhel Puri', 
      hints: {
        easy: 'Puffed Rice Mix',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    },
    { 
      word: 'Dahi Puri', 
      hints: {
        easy: 'Yogurt Balls',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    },
    { 
      word: 'Aloo Tikki', 
      hints: {
        easy: 'Potato Patty',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    },
    { 
      word: 'Samosa Chaat', 
      hints: {
        easy: 'Crushed Samosa',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    },
    { 
      word: 'Raj Kachori', 
      hints: {
        easy: 'Big Puri',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    },
    { 
      word: 'Papdi Chaat', 
      hints: {
        easy: 'Crispy Discs',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    },
    { 
      word: 'Golgappa', 
      hints: {
        easy: 'Crispy Shells',
        medium: 'Popular snack',
        hard: 'Street delicacy'
      }
    }
  ],
  'Traditions': [
    { 
      word: 'Namaste', 
      hints: {
        easy: 'Hands Together Greeting',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    },
    { 
      word: 'Tilak', 
      hints: {
        easy: 'Forehead Mark',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    },
    { 
      word: 'Mehendi', 
      hints: {
        easy: 'Henna Design',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    },
    { 
      word: 'Sindoor', 
      hints: {
        easy: 'Red Powder',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    },
    { 
      word: 'Mangalsutra', 
      hints: {
        easy: 'Marriage Necklace',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    },
    { 
      word: 'Karva Chauth', 
      hints: {
        easy: 'Wife Fasting',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    },
    { 
      word: 'Turban', 
      hints: {
        easy: 'Head Wrap',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    },
    { 
      word: 'Bindi', 
      hints: {
        easy: 'Forehead Dot',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    },
    { 
      word: 'Toe Rings', 
      hints: {
        easy: 'Married Woman Symbol',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    },
    { 
      word: 'Kalash', 
      hints: {
        easy: 'Holy Pot',
        medium: 'Cultural practice',
        hard: 'Traditional custom'
      }
    }
  ],
  'Songs': [
    { 
      word: 'Mere Sapno Ki Rani', 
      hints: {
        easy: 'Aradhana Song',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    },
    { 
      word: 'Chaiyya Chaiyya', 
      hints: {
        easy: 'Dil Se Train',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    },
    { 
      word: 'Tum Hi Ho', 
      hints: {
        easy: 'Aashiqui 2',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    },
    { 
      word: 'Gerua', 
      hints: {
        easy: 'Dilwale Song',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    },
    { 
      word: 'Ae Watan', 
      hints: {
        easy: 'Raazi Song',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    },
    { 
      word: 'Despacito Hindi', 
      hints: {
        easy: 'Remix Version',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    },
    { 
      word: 'Senorita', 
      hints: {
        easy: 'Zindagi Na Milegi',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    },
    { 
      word: 'Tum Se Hi', 
      hints: {
        easy: 'Jab We Met',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    },
    { 
      word: 'Kabira', 
      hints: {
        easy: 'Yeh Jawaani Hai Deewani',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    },
    { 
      word: 'Balam Pichkari', 
      hints: {
        easy: 'Yeh Jawaani Hai Deewani',
        medium: 'Popular song',
        hard: 'Bollywood track'
      }
    }
  ],
  'Monuments': [
    { 
      word: 'Taj Mahal', 
      hints: {
        easy: 'White Marble Tomb',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    },
    { 
      word: 'Red Fort', 
      hints: {
        easy: 'Delhi Fortress',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    },
    { 
      word: 'Qutub Minar', 
      hints: {
        easy: 'Tall Tower',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    },
    { 
      word: 'Gateway of India', 
      hints: {
        easy: 'Mumbai Arch',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    },
    { 
      word: 'Hawa Mahal', 
      hints: {
        easy: 'Palace of Winds',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    },
    { 
      word: 'Charminar', 
      hints: {
        easy: 'Four Minarets',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    },
    { 
      word: 'Lotus Temple', 
      hints: {
        easy: 'Bahai House',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    },
    { 
      word: 'Golden Temple', 
      hints: {
        easy: 'Sikh Shrine',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    },
    { 
      word: 'Ajanta Ellora', 
      hints: {
        easy: 'Cave Temples',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    },
    { 
      word: 'Konark Temple', 
      hints: {
        easy: 'Sun Temple',
        medium: 'Famous landmark',
        hard: 'Historical monument'
      }
    }
  ],
  'Games': [
    { 
      word: 'Kabaddi', 
      hints: {
        easy: 'Contact Sport',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    },
    { 
      word: 'Gilli Danda', 
      hints: {
        easy: 'Stick and Peg',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    },
    { 
      word: 'Kho Kho', 
      hints: {
        easy: 'Tag Game',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    },
    { 
      word: 'Cricket', 
      hints: {
        easy: 'Bat and Ball',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    },
    { 
      word: 'Chess', 
      hints: {
        easy: 'Strategy Board',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    },
    { 
      word: 'Carrom', 
      hints: {
        easy: 'Striker Game',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    },
    { 
      word: 'Ludo', 
      hints: {
        easy: 'Dice Board Game',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    },
    { 
      word: 'Snakes and Ladders', 
      hints: {
        easy: 'Climb and Slide',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    },
    { 
      word: 'Badminton', 
      hints: {
        easy: 'Shuttlecock Sport',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    },
    { 
      word: 'Football', 
      hints: {
        easy: 'Soccer',
        medium: 'Popular game',
        hard: 'Traditional sport'
      }
    }
  ],
  'Brands': [
    { 
      word: 'Nike', 
      hints: {
        easy: 'Just Do It',
        medium: 'Sports brand',
        hard: 'Swoosh logo'
      }
    },
    { 
      word: 'Adidas', 
      hints: {
        easy: 'Three stripes',
        medium: 'German sportswear',
        hard: 'Impossible is nothing'
      }
    },
    { 
      word: 'Puma', 
      hints: {
        easy: 'Cat logo',
        medium: 'Sports brand',
        hard: 'Forever faster'
      }
    },
    { 
      word: 'Gucci', 
      hints: {
        easy: 'Italian luxury',
        medium: 'Fashion house',
        hard: 'Double G logo'
      }
    },
    { 
      word: 'Louis Vuitton', 
      hints: {
        easy: 'LV monogram',
        medium: 'French luxury',
        hard: 'Luxury leather goods'
      }
    },
    { 
      word: 'Chanel', 
      hints: {
        easy: 'No. 5 perfume',
        medium: 'French fashion',
        hard: 'Coco Chanel'
      }
    },
    { 
      word: 'Prada', 
      hints: {
        easy: 'Italian luxury',
        medium: 'Fashion brand',
        hard: 'Miuccia Prada'
      }
    },
    { 
      word: 'Versace', 
      hints: {
        easy: 'Medusa head',
        medium: 'Italian fashion',
        hard: 'Gianni Versace'
      }
    },
    { 
      word: 'Armani', 
      hints: {
        easy: 'Italian designer',
        medium: 'Fashion house',
        hard: 'Giorgio Armani'
      }
    },
    { 
      word: 'Dolce & Gabbana', 
      hints: {
        easy: 'Italian fashion',
        medium: 'Designer brand',
        hard: 'D&G'
      }
    },
    { 
      word: 'Hermès', 
      hints: {
        easy: 'Orange boxes',
        medium: 'French luxury',
        hard: 'Birkin bag'
      }
    },
    { 
      word: 'Burberry', 
      hints: {
        easy: 'Trench coats',
        medium: 'British luxury',
        hard: 'Plaid pattern'
      }
    },
    { 
      word: 'Balenciaga', 
      hints: {
        easy: 'Spanish luxury',
        medium: 'Fashion house',
        hard: 'Cristóbal Balenciaga'
      }
    },
    { 
      word: 'Saint Laurent', 
      hints: {
        easy: 'YSL logo',
        medium: 'French fashion',
        hard: 'Yves Saint Laurent'
      }
    },
    { 
      word: 'Dior', 
      hints: {
        easy: 'French luxury',
        medium: 'Fashion house',
        hard: 'Christian Dior'
      }
    },
    { 
      word: 'Fendi', 
      hints: {
        easy: 'Italian luxury',
        medium: 'Fashion brand',
        hard: 'Double F logo'
      }
    },
    { 
      word: 'Valentino', 
      hints: {
        easy: 'Italian fashion',
        medium: 'Designer brand',
        hard: 'Red dresses'
      }
    },
    { 
      word: 'Givenchy', 
      hints: {
        easy: 'French luxury',
        medium: 'Fashion house',
        hard: 'Hubert de Givenchy'
      }
    },
    { 
      word: 'Bottega Veneta', 
      hints: {
        easy: 'Italian luxury',
        medium: 'Leather goods',
        hard: 'Intrecciato weave'
      }
    },
    { 
      word: 'Celine', 
      hints: {
        easy: 'French fashion',
        medium: 'Luxury brand',
        hard: 'Phoebe Philo'
      }
    },
    { 
      word: 'Loewe', 
      hints: {
        easy: 'Spanish luxury',
        medium: 'Fashion house',
        hard: 'Jonathan Anderson'
      }
    },
    { 
      word: 'Off-White', 
      hints: {
        easy: 'Streetwear brand',
        medium: 'Fashion label',
        hard: 'Virgil Abloh'
      }
    },
    { 
      word: 'Supreme', 
      hints: {
        easy: 'Box logo',
        medium: 'Streetwear brand',
        hard: 'James Jebbia'
      }
    },
    { 
      word: 'Champion', 
      hints: {
        easy: 'Reverse weave',
        medium: 'Athletic wear',
        hard: 'C logo'
      }
    },
    { 
      word: 'Converse', 
      hints: {
        easy: 'Chuck Taylor',
        medium: 'Sneaker brand',
        hard: 'All Star'
      }
    },
    { 
      word: 'Vans', 
      hints: {
        easy: 'Skate shoes',
        medium: 'Sneaker brand',
        hard: 'Off the Wall'
      }
    },
    { 
      word: 'New Balance', 
      hints: {
        easy: 'N logo',
        medium: 'Athletic shoes',
        hard: 'Made in USA'
      }
    },
    { 
      word: 'Reebok', 
      hints: {
        easy: 'Vector logo',
        medium: 'Athletic brand',
        hard: 'I am what I am'
      }
    },
    { 
      word: 'Under Armour', 
      hints: {
        easy: 'UA logo',
        medium: 'Athletic wear',
        hard: 'I Will'
      }
    }
  ],
  'TV Shows': [
    { 
      word: 'Ramayan', 
      hints: {
        easy: 'Lord Rama Story',
        medium: 'TV series',
        hard: 'Television show'
      }
    },
    { 
      word: 'Mahabharat', 
      hints: {
        easy: 'Epic War',
        medium: 'TV series',
        hard: 'Television show'
      }
    },
    { 
      word: 'Taarak Mehta', 
      hints: {
        easy: 'Gokuldham Society',
        medium: 'TV series',
        hard: 'Television show'
      }
    },
    { 
      word: 'Bhabhi Ji Ghar Par', 
      hints: {
        easy: 'Comedy Show',
        medium: 'TV series',
        hard: 'Television show'
      }
    },
    { 
      word: 'Kumkum Bhagya', 
      hints: {
        easy: 'Daily Soap',
        medium: 'TV series',
        hard: 'Television show'
      }
    },
    { 
      word: 'Yeh Rishta', 
      hints: {
        easy: 'Family Drama',
        medium: 'TV series',
        hard: 'Television show'
      }
    },
    { 
      word: 'Bigg Boss', 
      hints: {
        easy: 'Reality Show',
        medium: 'TV series',
        hard: 'Television show'
      }
    },
    { 
      word: 'Kaun Banega Crorepati', 
      hints: {
        easy: 'Quiz Show',
        medium: 'TV series',
        hard: 'Television show'
      }
    },
    { 
      word: 'The Kapil Sharma Show', 
      hints: {
        easy: 'Comedy Night',
        medium: 'TV series',
        hard: 'Television show'
      }
    },
    { 
      word: 'Dance India Dance', 
      hints: {
        easy: 'Dance Reality',
        medium: 'TV series',
        hard: 'Television show'
      }
    }
  ],
  'Mythology': [
    { 
      word: 'Ram', 
      hints: {
        easy: 'Maryada Purushottam',
        medium: 'Hindu deity',
        hard: 'Mythological figure'
      }
    },
    { 
      word: 'Krishna', 
      hints: {
        easy: 'Blue God',
        medium: 'Hindu deity',
        hard: 'Mythological figure'
      }
    },
    { 
      word: 'Ganesha', 
      hints: {
        easy: 'Elephant God',
        medium: 'Indian celebration',
        hard: 'Cultural festival'
      }
    },
    { 
      word: 'Durga', 
      hints: {
        easy: 'Goddess of Power',
        medium: 'Hindu deity',
        hard: 'Mythological figure'
      }
    },
    { 
      word: 'Hanuman', 
      hints: {
        easy: 'Monkey God',
        medium: 'Hindu deity',
        hard: 'Mythological figure'
      }
    },
    { 
      word: 'Shiva', 
      hints: {
        easy: 'Destroyer',
        medium: 'Hindu deity',
        hard: 'Mythological figure'
      }
    },
    { 
      word: 'Vishnu', 
      hints: {
        easy: 'Preserver',
        medium: 'Hindu deity',
        hard: 'Mythological figure'
      }
    },
    { 
      word: 'Brahma', 
      hints: {
        easy: 'Creator',
        medium: 'Hindu deity',
        hard: 'Mythological figure'
      }
    },
    { 
      word: 'Lakshmi', 
      hints: {
        easy: 'Goddess of Wealth',
        medium: 'Hindu deity',
        hard: 'Mythological figure'
      }
    },
    { 
      word: 'Saraswati', 
      hints: {
        easy: 'Goddess of Knowledge',
        medium: 'Hindu deity',
        hard: 'Mythological figure'
      }
    }
  ],
  'Languages': [
    { 
      word: 'Hindi', 
      hints: {
        easy: 'National Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    },
    { 
      word: 'Tamil', 
      hints: {
        easy: 'Chennai Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    },
    { 
      word: 'Telugu', 
      hints: {
        easy: 'Hyderabad Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    },
    { 
      word: 'Bengali', 
      hints: {
        easy: 'Kolkata Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    },
    { 
      word: 'Marathi', 
      hints: {
        easy: 'Mumbai Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    },
    { 
      word: 'Gujarati', 
      hints: {
        easy: 'Gujarat Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    },
    { 
      word: 'Punjabi', 
      hints: {
        easy: 'Punjab Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    },
    { 
      word: 'Malayalam', 
      hints: {
        easy: 'Kerala Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    },
    { 
      word: 'Kannada', 
      hints: {
        easy: 'Karnataka Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    },
    { 
      word: 'Odia', 
      hints: {
        easy: 'Odisha Language',
        medium: 'Indian language',
        hard: 'Regional dialect'
      }
    }
  ],
  'Dance Forms': [
    { 
      word: 'Bharatanatyam', 
      hints: {
        easy: 'Classical South',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    },
    { 
      word: 'Kathak', 
      hints: {
        easy: 'North Indian Classical',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    },
    { 
      word: 'Odissi', 
      hints: {
        easy: 'Odisha Classical',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    },
    { 
      word: 'Bhangra', 
      hints: {
        easy: 'Punjabi Folk',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    },
    { 
      word: 'Garba', 
      hints: {
        easy: 'Gujarati Folk',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    },
    { 
      word: 'Kuchipudi', 
      hints: {
        easy: 'Andhra Classical',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    },
    { 
      word: 'Kathakali', 
      hints: {
        easy: 'Kerala Classical',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    },
    { 
      word: 'Manipuri', 
      hints: {
        easy: 'Manipur Classical',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    },
    { 
      word: 'Mohiniyattam', 
      hints: {
        easy: 'Kerala Classical',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    },
    { 
      word: 'Sattriya', 
      hints: {
        easy: 'Assam Classical',
        medium: 'Classical dance',
        hard: 'Traditional art form'
      }
    }
  ],
  'Spices': [
    { 
      word: 'Turmeric', 
      hints: {
        easy: 'Golden Powder',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    },
    { 
      word: 'Cumin', 
      hints: {
        easy: 'Jeera',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    },
    { 
      word: 'Coriander', 
      hints: {
        easy: 'Dhaniya',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    },
    { 
      word: 'Cardamom', 
      hints: {
        easy: 'Elaichi',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    },
    { 
      word: 'Cinnamon', 
      hints: {
        easy: 'Dalchini',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    },
    { 
      word: 'Cloves', 
      hints: {
        easy: 'Laung',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    },
    { 
      word: 'Bay Leaves', 
      hints: {
        easy: 'Tej Patta',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    },
    { 
      word: 'Fenugreek', 
      hints: {
        easy: 'Methi',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    },
    { 
      word: 'Mustard Seeds', 
      hints: {
        easy: 'Rai',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    },
    { 
      word: 'Fennel', 
      hints: {
        easy: 'Saunf',
        medium: 'Cooking ingredient',
        hard: 'Aromatic spice'
      }
    }
  ]
};

// Helper function to get a random word from a category
export const getRandomWordFromCategory = (category: string): WordData | null => {
  const words = WORDS_BY_CATEGORY[category];
  if (!words || words.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

// Helper function to get hint for a specific difficulty
export const getHintForDifficulty = (wordData: WordData, difficulty: HintDifficulty): string => {
  return wordData.hints[difficulty];
};

// Helper function to get all available categories
export const getAllCategories = (): string[] => {
  return Object.keys(WORDS_BY_CATEGORY);
};
