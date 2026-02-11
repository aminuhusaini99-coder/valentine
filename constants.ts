import { LocationNode } from './types';

export const MUSIC_PLAYLIST = [
  { title: "情人 (Lover)", artist: "G.E.M.", url: "#" }, // Placeholder
  { title: "My Secret", artist: "G.E.M.", url: "#" },
  { title: "You Are My Scenery", artist: "Ost", url: "#" },
];

export const NODES: LocationNode[] = [
  {
    id: 'node-1',
    title: '初识 · 华师大',
    x: 10,
    y: 50,
    type: 'game',
    isLocked: false,
    content: {
      description: '我们两个学校不在一起，我在华师大普陀校区，你在交大闵行校区。虽然距离很远，但外卖连起了我们的心。',
      image: 'https://picsum.photos/400/300?random=1',
      game: {
        type: 'delivery',
        target: 'Help us exchange milk tea!',
      }
    }
  },
  {
    id: 'node-2',
    title: '第一次约会',
    x: 35,
    y: 30,
    type: 'quiz',
    isLocked: true,
    content: {
      description: '还记得我们第一次正式约会是在哪里吗？那个紧张又甜蜜的夜晚。',
      image: 'https://picsum.photos/400/300?random=2',
      quiz: {
        question: '我们第一次正式约会的地点是？',
        options: ['外滩江边', '静安寺', '迪士尼小镇', '学校食堂'],
        correctIndex: 0
      }
    }
  },
  {
    id: 'node-3',
    title: '迪士尼乐园',
    x: 60,
    y: 60,
    type: 'story',
    isLocked: true,
    content: {
      description: '童话世界里的烟花，正如我见到你那一刻的心情。城堡前的那张合影，我一直珍藏着。',
      image: 'https://picsum.photos/400/300?random=3'
    }
  },
  {
    id: 'node-ending',
    title: '治愈终点',
    x: 85,
    y: 40,
    type: 'ending',
    isLocked: true,
    content: {
      description: '点击爱心，查收我的心意。',
      image: 'https://picsum.photos/400/300?random=4'
    }
  }
];