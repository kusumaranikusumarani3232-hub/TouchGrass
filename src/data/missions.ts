import type { Mission } from '../types';

export const OUTDOOR_MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: '15-Minute Outdoor Walk',
    category: 'walk',
    durationMinutes: 15,
    description: 'Walk around your neighborhood, park, or trail for 15 minutes. Look closely and photograph something interesting.',
    hint: 'Put your phone in your pocket while walking until you spot your object!',
    iconName: 'Footprints',
    targetType: 'Any intriguing natural element'
  },
  {
    id: 'm2',
    title: 'Trio of Leaves Scavenger',
    category: 'scavenger',
    durationMinutes: 10,
    description: 'Find 3 leaves with noticeably different shapes, colors, or edge patterns. Photograph the most unique one.',
    hint: 'Observe the vein patterns and serrated edges.',
    iconName: 'Leaf',
    targetType: 'Unique leaf specimen'
  },
  {
    id: 'm3',
    title: 'Nature in Motion',
    category: 'observer',
    durationMinutes: 12,
    description: 'Find something actively moving in nature—a fluttering insect, a swaying branch, rippling water, or a foraging bird.',
    hint: 'Stand still for 60 seconds and look for subtle movements.',
    iconName: 'Wind',
    targetType: 'Moving living thing or natural element'
  },
  {
    id: 'm4',
    title: 'Acoustic Sound Mapping',
    category: 'acoustic',
    durationMinutes: 10,
    description: 'Close your eyes outdoor for 2 minutes and listen for bird calls or rustling foliage. Locate the source and photograph the area.',
    hint: 'Notice how sound travels outdoors compared to indoors.',
    iconName: 'Volume2',
    targetType: 'Source of nature sound'
  },
  {
    id: 'm5',
    title: 'Hidden Texture Micro-Hunt',
    category: 'micro',
    durationMinutes: 8,
    description: 'Get up close to tree bark, weathered stones, moss patches, or flower petals. Capture a macro photo of the texture.',
    hint: 'Inspect the microscopic ridges and color shifts.',
    iconName: 'Sparkles',
    targetType: 'Macro texture on wood, stone, or plant'
  },
  {
    id: 'm6',
    title: 'The Unnoticed Detail',
    category: 'observer',
    durationMinutes: 15,
    description: 'Find something in your local outdoor space that you have walked past a dozen times but never truly noticed.',
    hint: 'Look up at canopy tops or down along path edges.',
    iconName: 'Eye',
    targetType: 'Unnoticed outdoor detail'
  },
  {
    id: 'm7',
    title: 'Water & Light Reflection',
    category: 'scavenger',
    durationMinutes: 12,
    description: 'Find a lake, pond, stream, puddle, or dew drop reflecting light or the open sky.',
    hint: 'Watch how water ripples create dynamic light paintings.',
    iconName: 'Droplets',
    targetType: 'Water reflection or aquatic life'
  }
];

export const INITIAL_BADGES = [
  {
    id: 'b1',
    name: 'First Adventure',
    description: 'Completed your very first Touch Grass mission outdoors!',
    icon: '🌱',
    unlocked: false,
    requiredMissions: 1
  },
  {
    id: 'b2',
    name: '15-Minute Explorer',
    description: 'Spent at least 15 uninterrupted minutes exploring outside.',
    icon: '🚶',
    unlocked: false,
    requiredMissions: 2
  },
  {
    id: 'b3',
    name: 'Nature Observer',
    description: 'Analyzed 3 natural specimens with open-weight AI.',
    icon: '📸',
    unlocked: false,
    requiredMissions: 3
  },
  {
    id: 'b4',
    name: 'Flora & Fauna Specialist',
    description: 'Logged 5 outdoor discoveries in your Nature Journal.',
    icon: '🌿',
    unlocked: false,
    requiredMissions: 5
  },
  {
    id: 'b5',
    name: 'Touch Grass Master',
    description: 'Accumulated over 60 minutes of offline outdoor exploration!',
    icon: '☀️',
    unlocked: false,
    requiredMissions: 8
  }
];

export const SAMPLE_NATURE_IMAGES = [
  {
    id: 's1',
    name: 'Serene Alpine Lake',
    category: 'Water & Sky',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Crystal clear lake reflecting evergreen trees and sky',
    presetAnalysis: {
      identification: 'Glacial Alpine Lake & Pine Forest',
      category: 'water' as const,
      description: 'A serene body of open fresh water reflecting surrounding evergreen pines and clear blue sky overhead.',
      facts: [
        'Lakes act as thermal buffers, storing heat during the day and moderating the microclimate of nearby foliage.',
        'The mirror-like reflection occurs when wind velocity drops below 2 knots, creating a specular surface effect.'
      ],
      sensoryObservation: 'Notice how the water surface mirrors the tree line. Feel the cool ambient air rising off the shoreline.',
      nextChallenge: '🎯 Next outdoor challenge: Walk along the edge and spot one living organism near the water line.',
      confidenceScore: 0.96,
      modelUsed: 'Llama-3.2-11B-Vision (Open-Weight)',
      provider: 'Groq Qwen Vision' as const,
      analysisTimeMs: 420
    }
  },
  {
    id: 's2',
    name: 'Sunlit Oak Leaf',
    category: 'Botany & Leaves',
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    description: 'Vibrant green leaf showing intricate vein network',
    presetAnalysis: {
      identification: 'Deciduous Oak Leaf (Quercus genus)',
      category: 'plant' as const,
      description: 'A healthy sun-drenched green leaf showcasing distinct reticulate vein structure and lobed margins.',
      facts: [
        'Chlorophyll molecules absorb red and blue light wavelengths while reflecting green light back into your eyes.',
        'A single mature oak tree can transport over 100 gallons of water per day from root systems to leaf stomata.'
      ],
      sensoryObservation: 'Hold the leaf up against daylight to reveal the translucent vascular network transporting nutrients.',
      nextChallenge: '🎯 Next outdoor challenge: Search nearby for a leaf with a completely different edge pattern.',
      confidenceScore: 0.94,
      modelUsed: 'Qwen2-VL-7B-Instruct (Open-Weight)',
      provider: 'Hugging Face Open-Weight API' as const,
      analysisTimeMs: 510
    }
  },
  {
    id: 's3',
    name: 'Monarch Butterfly',
    category: 'Wildlife & Insects',
    url: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?auto=format&fit=crop&w=800&q=80',
    description: 'Monarch butterfly resting on wildflowers',
    presetAnalysis: {
      identification: 'Monarch Butterfly (Danaus plexippus)',
      category: 'animal' as const,
      description: 'Iconic orange and black patterned butterfly perched on nectar-rich botanical blooms.',
      facts: [
        'Monarch butterflies travel up to 3,000 miles during multi-generational annual migrations using solar navigation.',
        'Their bright orange coloration acts as a warning signal (aposematism) to predators about cardenolide toxins.'
      ],
      sensoryObservation: 'Watch the gentle rhythmic fanning of its wings as it balances on the floral petals.',
      nextChallenge: '🎯 Next outdoor challenge: Listen quietly for 30 seconds and identify any pollinator hums nearby.',
      confidenceScore: 0.98,
      modelUsed: 'BLIP2-Vision (Open-Weight)',
      provider: 'Browser-Local Open Model' as const,
      analysisTimeMs: 380
    }
  },
  {
    id: 's4',
    name: 'Mossy Forest Path',
    category: 'Forest & Ground',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    description: 'Sunlight filtering through canopy onto mossy ground',
    presetAnalysis: {
      identification: 'Temperately Mossy Forest Floor',
      category: 'landscape' as const,
      description: 'Thick emerald bryophyte moss carpet spreading across ancient woodland floor under filtered sunlight.',
      facts: [
        'Mosses lack true vascular roots and absorb moisture directly from humid forest air through their leaves.',
        'Forest air contains phytoncides—organic compounds emitted by trees that lower stress hormones in humans.'
      ],
      sensoryObservation: 'Inhale deeply. Notice the rich damp earth aroma (geosmin) released by soil micro-organisms.',
      nextChallenge: '🎯 Next outdoor challenge: Touch the moss carpet gently and feel its sponge-like texture.',
      confidenceScore: 0.93,
      modelUsed: 'Llama-3.2-11B-Vision (Open-Weight)',
      provider: 'Groq Qwen Vision' as const,
      analysisTimeMs: 440
    }
  }
];
