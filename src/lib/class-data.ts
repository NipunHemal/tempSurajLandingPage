
export const availableClasses = [
  {
    id: 1,
    imageId: 'class-1',
    tags: ['Beginner', 'History'],
    title: 'World History: Ancient Civilizations',
    description: 'Explore the foundations of human civilization, from Mesopotamia to Rome.',
    link: '/dashboard/class/1',
    paid: false,
    status: 'free',
  },
  {
    id: 2,
    imageId: 'class-2',
    tags: ['Intermediate', 'Science'],
    title: 'Introduction to Quantum Physics',
    description: 'A glimpse into the strange and fascinating world of quantum mechanics.',
    link: '/dashboard/class/2',
    paid: true,
    status: 'unpaid',
  },
  {
    id: 3,
    imageId: 'class-3',
    tags: ['Advanced', 'Literature'],
    title: 'Shakespearean Tragedies',
    description: 'An in-depth analysis of Shakespeare\'s greatest tragic plays.',
    link: '/dashboard/class/3',
    paid: true,
    status: 'paid',
  },
  {
    id: 4,
    imageId: 'class-4',
    tags: ['Beginner', 'Art'],
    title: 'Introduction to Drawing',
    description: 'Learn the fundamental skills and techniques of drawing.',
    link: '/dashboard/class/4',
    paid: false,
    status: 'free',
  },
];

export const myClasses = [
  {
    id: 5,
    imageId: 'class-5',
    tags: ['In Progress', 'Mathematics'],
    title: 'Calculus I',
    description: 'Master the concepts of limits, derivatives, and integrals.',
    link: '/dashboard/class/5',
    paid: false,
    status: 'free',
  },
  {
    id: 6,
    imageId: 'class-6',
    tags: ['Completed', 'Computer Science'],
    title: 'Data Structures and Algorithms',
    description: 'Learn how to organize data efficiently and solve complex problems.',
    link: '/dashboard/class/6',
    paid: false,
    status: 'free',
  },
  {
    id: 7,
    imageId: 'class-7',
    tags: ['In Progress', 'Biology'],
    title: 'Genetics and Evolution',
    description: 'Explore the mechanisms of heredity and the diversity of life on Earth.',
    link: '/dashboard/class/7',
    paid: false,
    status: 'free',
  },
  {
    id: 8,
    imageId: 'class-8',
    tags: ['New', 'Music'],
    title: 'Piano for Beginners',
    description: 'Start your musical journey with the fundamentals of piano playing.',
    link: '/dashboard/class/8',
    paid: true,
    status: 'paid',
  },
];

export const classDetails: Record<string, any> = {
  '1': {
    title: 'World History: Ancient Civilizations',
    description: 'This course provides a comprehensive overview of the major ancient civilizations that have shaped our world. We will journey through time to explore the rise and fall of empires, the development of writing, the birth of philosophy, and the construction of monumental wonders. By examining the political, social, and cultural achievements of these societies, students will gain a deeper understanding of the foundations of modern civilization.',
    bannerImageId: 'class-banner-1',
    paid: false,
    modules: [
      {
        title: 'Module 1: Mesopotamia',
        lessons: [
          { 
            id: '1-1', 
            title: 'The Fertile Crescent', 
            description: 'The dawn of agriculture and civilization in Mesopotamia.', 
            imageId: 'lesson-1-1', 
            tags: ['Lesson'], 
            link: '/dashboard/class/1/lesson/1-1',
            status: 'Completed',
            longDescription: 'This lesson explores the geographical and environmental factors of the Fertile Crescent that gave rise to the world\'s first agricultural societies. We will examine how the domestication of plants and animals transformed human life and led to the establishment of permanent settlements.',
            bannerImageId: 'lesson-banner-1-1',
            content: [
              {
                type: 'video',
                title: 'Lecture: The Neolithic Revolution',
                duration: '15:23',
                link: '#'
              },
              {
                type: 'reading',
                title: 'Chapter 1: Dawn of Agriculture',
                duration: '25 min read',
                link: '#'
              },
              {
                type: 'exam',
                title: 'Exam 1: Early Settlements',
                duration: '10 Questions',
                link: '#'
              }
            ]
          },
          { 
            id: '1-2', 
            title: 'Sumerian City-States', 
            description: 'The development of writing, law, and urban life.', 
            imageId: 'lesson-1-2', 
            tags: ['Lesson'], 
            link: '/dashboard/class/1/lesson/1-2',
            status: 'In Progress',
            longDescription: 'Discover the complex urban centers of Sumer, including Ur and Uruk. This lesson covers the invention of cuneiform writing, the development of the first legal codes, and the intricate social and political structures of Sumerian city-states.',
            bannerImageId: 'lesson-banner-1-2',
             content: [
              {
                type: 'video',
                title: 'Video: Cuneiform and Early Writing',
                duration: '12:45',
                link: '#'
              },
              {
                type: 'reading',
                title: 'Article: The Code of Ur-Nammu',
                duration: '15 min read',
                link: '#'
              },
              {
                type: 'assignment',
                title: 'Assignment: Translate a Cuneiform Tablet',
                duration: 'Due Oct 28',
                link: '#'
              }
            ]
          },
        ],
      },
      {
        title: 'Module 2: Ancient Egypt',
        lessons: [
          { id: '2-1', title: 'The Gift of the Nile', description: 'Life along the river.', imageId: 'lesson-2-1', tags: ['Lesson'], link: '/dashboard/class/1/lesson/2-1' },
          { id: '2-2', title: 'Pharaohs and Pyramids', description: 'Power and the afterlife.', imageId: 'lesson-2-2', tags: ['Lesson'], link: '/dashboard/class/1/lesson/2-2' },
          { id: '2-3', title: 'Hieroglyphs', description: 'The sacred script.', imageId: 'lesson-2-3', tags: ['Lesson'], link: '/dashboard/class/1/lesson/2-3' },
          { id: '2-4', title: 'Gods and Goddesses', description: 'The Egyptian pantheon.', imageId: 'lesson-2-4', tags: ['Lesson'], link: '/dashboard/class/1/lesson/2-4' },
        ],
      }
    ]
  },
  '2': {
    title: 'Introduction to Quantum Physics',
    description: 'A glimpse into the strange and fascinating world of quantum mechanics.',
    bannerImageId: 'class-banner-1',
    paid: true,
    modules: [],
  },
  '3': {
    title: 'Shakespearean Tragedies',
    description: 'An in-depth analysis of Shakespeare\'s greatest tragic plays.',
    bannerImageId: 'class-banner-1',
    paid: true,
    modules: [],
  },
  '4': {
    title: 'Introduction to Drawing',
    description: 'Learn the fundamental skills and techniques of drawing.',
    bannerImageId: 'class-banner-1',
    paid: false,
    modules: [],
  },
  '5': {
    title: 'Calculus I',
    description: 'Master the concepts of limits, derivatives, and integrals.',
    bannerImageId: 'class-banner-1',
    paid: false,
    modules: [],
  },
  '6': {
    title: 'Data Structures and Algorithms',
    description: 'Learn how to organize data efficiently and solve complex problems.',
    bannerImageId: 'class-banner-1',
    paid: false,
    modules: [],
  },
  '7': {
    title: 'Genetics and Evolution',
    description: 'Explore the mechanisms of heredity and the diversity of life on Earth.',
    bannerImageId: 'class-banner-1',
    paid: false,
    modules: [],
  },
  '8': {
    title: 'Piano for Beginners',
    description: 'Start your musical journey with the fundamentals of piano playing.',
    bannerImageId: 'class-banner-1',
    paid: true,
    modules: [],
  },
};

// Add dummy data for other lessons for demonstration
[ '2-1', '2-2', '2-3', '2-4'].forEach(id => {
  if (classDetails['1']) {
    const lesson = classDetails['1'].modules.flatMap((m: any) => m.lessons).find((l: any) => l.id === id);
    if(lesson) {
      (lesson as any).status = 'Not Started';
      (lesson as any).longDescription = 'Detailed description coming soon...';
      (lesson as any).bannerImageId = 'class-banner-1';
      (lesson as any).content = [
        { type: 'video', title: 'Introductory Video', duration: '5:00', link: '#' },
        { type: 'reading', title: 'Introductory Reading', duration: '10 min read', link: '#' }
      ];
    }
  }
});
