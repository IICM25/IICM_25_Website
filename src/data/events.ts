export interface EventData {
	slug: string;
	title: string;
	category: string;
	imageUrl: string;
}

export interface EventsDetails {
	[slug: string]: {
		overviewContent: string;
		competitionsList: { name: string; desc: string }[];
		contactsList: { name: string; role: string; phone: string }[];
	};
}

export const eventsData: EventData[] = [
  {
    slug: "literaryartscup",
    title: "Literary Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/ELS.png"
  },
  {
    slug: "quizcup",
    title: "Quiz Cup",
    category: "Cup Event",
    imageUrl: "/events/quiz1.png"
  },
  {
    slug: "speakingarts",
    title: "Speaking Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/speaking.png"
  },
  {
    slug: "comedic",
    title: "Comedic Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/comedy.jpg"
  },
  {
    slug: "dance",
    title: "Dance Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/dance.jpeg"
  },
  {
    slug: "theatre",
    title: "Theatre Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/dramatics.jpg"
  },
  {
    slug: "musicalarts",
    title: "Musical Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/music.jpeg"
  },
  {
    slug: "finearts",
    title: "Fine Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/fineArts.jpg"
  },
  {
    slug: "filmmaking",
    title: "Film Making Cup",
    category: "Cup Event",
    imageUrl: "/events/Photography.png"
  },
  {
    slug: "digitalarts",
    title: "Digital Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/digital.png"
  },
  {
    slug: "photography",
    title: "Photography Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/photo.png"
  },
  {
    slug: "fashion",
    title: "Fashion Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/mnm.jpg"
  },
  {
    slug: "culinary",
    title: "Culinary Arts Cup",
    category: "Cup Event",
    imageUrl: "/events/culinary.png"
  }
]


export const competitions = [
	{
		event: "DANCE",
		comp: "JITTERBUG",
		desc: "WESTERN GROUP DANCE",
		type: "GROUP",
		link: "/dance",
	},
	{
		event: "DANCE",
		comp: "ESTAMPIE ",
		desc: "SOLO WESTERN DANCE",
		type: "SOLO",
		link: "/dance",
	},
	{
		event: "DANCE",
		comp: "TOUR DE FORCE",
		desc: "STREET DANCE",
		type: "GROUP",
		link: "/dance",
	},
	{
		event: "DANCE",
		comp: "NRITYANGANA ",
		desc: "SOLO CLASSICAL DANCE",
		type: "SOLO",
		link: "/dance",
	},
	{
		event: "DANCE",
		comp: "ROOTS",
		desc: "TRADITIONAL GROUP DANCE",
		type: "GROUP",
		link: "/dance",
	},
	{
		event: "DANCE",
		comp: "DUET ",
		desc: "DUET DANCE",
		type: "GROUP",
		link: "/dance",
	},
	{
		event: "ANIME CONVENTION",
		comp: "COSPLAY",
		desc: "ANIME/MANGA COSPLAY COMPETITION",
		type: "GROUP",
		link: "/anicon",
	},
	{
		event: "ANIME CONVENTION",
		comp: "ANIME QUIZ",
		desc: "ANIME QUIZ",
		type: "GROUP",
		link: "/anicon",
	},
	{
		event: "ANIME CONVENTION",
		comp: "AMV SUBMISSION COMPETITION",
		desc: "AMV SUBMISSION COMPETITION",
		type: "SOLO",
		link: "/anicon",
	},
	{
		event: "DRAMATICS",
		comp: 'NUKKAD NATAK - "THE STREET PLAY"',
		desc: "STREET PLAY COMPETITION",
		type: "GROUP",
		link: "/dramatics",
	},
	{
		event: "DRAMATICS",
		comp: "THE STAGE PLAY",
		desc: "STAGE PLAY COMPETITION",
		type: "GROUP",
		link: "/dramatics",
	},
	{
		event: "DRAMATICS",
		comp: 'MIMICA - "THE MIME"',
		desc: "MIME(SILENT ACT) COMPETITION",
		type: "GROUP",
		link: "/dramatics",
	},
	{
		event: "DRAMATICS",
		comp: "MONO ACT",
		desc: "DRAMATIC MONO ACT COMPETITITON",
		type: "SOLO",
		link: "/dramatics",
	},
	{
		event: "ENGLISH LITERARY EVENTS",
		comp: "POETRY SLAM",
		desc: "SOLO POETRY COMPETITION",
		type: "SOLO",
		link: "/ele",
	},
	{
		event: "ENGLISH LITERARY EVENTS",
		comp: "WORD GAMES",
		desc: "WORD GAMES (EG:- REBUSES, ANAGRAMS, HOMONYMS, CRYPTIC CROSSWORD ETC. )",
		type: "GROUP",
		link: "/ele",
	},
	{
		event: "ENGLISH LITERARY EVENTS",
		comp: "J.A.M",
		desc: "JUST A MINUTE COMPETITION",
		type: "SOLO",
		link: "/ele",
	},
	{
		event: "ENGLISH LITERARY EVENTS",
		comp: "CREATIVE WRITING",
		desc: "CREATIVE WRITING COMPETITION",
		type: "GROUP",
		link: "/ele",
	},
	{
		event: "ENGLISH LITERARY EVENTS",
		comp: "TINY TALES",
		desc: "A COMPETITION OF BRIEF AND AMUSING SNIPPET, USING ANY FORM OF LITERATURE (PROSE, POETRY ETC.) OF YOUR CHOICE.\r\n",
		type: "SOLO",
		link: "/ele",
	},
	{
		event: "FINE ARTS",
		comp: "SURREALISM",
		desc: "SURREALISM ART COMPETITION",
		type: "SOLO",
		link: "/finearts",
	},
	{
		event: "FINE ARTS",
		comp: "FASHION GEEKS",
		desc: "COSTUME DESIGNING COMPETITION",
		type: "GROUP",
		link: "/finearts",
	},
	{
		event: "FINE ARTS",
		comp: "JAPANESE QUILING AND ORIGAMI",
		desc: "ORIGAMI MAKING COMPETITION",
		type: "GROUP",
		link: "/finearts",
	},
	{
		event: "FINE ARTS",
		comp: "MASQUE",
		desc: "MASK MAKING COMPETITION",
		type: "GROUP",
		link: "/finearts",
	},
	{
		event: "FINE ARTS",
		comp: "BATTLE OF ART",
		desc: "GROUP ART BATTLE COMPETITION",
		type: "GROUP",
		link: "/finearts",
	},
	{
		event: "FINE ARTS",
		comp: "MANDALA ART",
		desc: "MANDALA ART COMPETITION",
		type: "SOLO",
		link: "/finearts",
	},
	{
		event: "FILMS AND PHOTOGRAPHY",
		comp: "WANDERLUST",
		desc: "ON SPOT NATURE VIDEOGRAPHY",
		type: "GROUP",
		link: "/fnp",
	},
	{
		event: "FILMS AND PHOTOGRAPHY",
		comp: "KAHANI",
		desc: "SHORT FILMMAKING COMPETITION",
		type: "GROUP",
		link: "/fnp",
	},
	{
		event: "FILMS AND PHOTOGRAPHY",
		comp: "SCREENWRITING",
		desc: "ONLINE SCREENWRITING COMPETITION",
		type: "SOLO",
		link: "/fnp",
	},
	{
		event: "FILMS AND PHOTOGRAPHY",
		comp: "PHOTOSTORY",
		desc: "THEME BASED PHOTO STORY MAKING",
		type: "SOLO",
		link: "/fnp",
	},
	{
		event: "FILMS AND PHOTOGRAPHY",
		comp: "APERTURE",
		desc: "1000 WORDS STORY ON 1 PHOTO",
		type: "SOLO",
		link: "/fnp",
	},
	{
		event: "FILMS AND PHOTOGRAPHY",
		comp: "BHAAVNA",
		desc: "A COMPETITION WHERE YOU HAVE TO CLICK A PORTRAIT WHICH CAN CONVEY AN EMOTION SUCH AS - GRIEF, ELATION,GLOOM,BEAUTY,VOID,ECSTASY,EUPHORIA.",
		type: "SOLO",
		link: "/fnp",
	},
	{
		event: "HINDI LITERARY EVENTS",
		comp: "KAVYANJALI",
		desc: "HINDI POETRY COMPETITION",
		type: "SOLO",
		link: "/hle",
	},
	{
		event: "HINDI LITERARY EVENTS",
		comp: "MAYANAGRI",
		desc: "CULTURAL AND INDIAN MYTHOLOGICAL QUIZ",
		type: "SOLO",
		link: "/hle",
	},
	{
		event: "HINDI LITERARY EVENTS",
		comp: "AAMNE-SAMNE",
		desc: "PANEL DEBATE",
		type: "GROUP",
		link: "/hle",
	},
	{
		event: "HINDI LITERARY EVENTS",
		comp: "KIRDAR",
		desc: "STORY WRITING AND RECITING COMPETITION",
		type: "SOLO",
		link: "/hle",
	},
	{
		event: "HINDI LITERARY EVENTS",
		comp: "DRISHTIKON",
		desc: "HINDI EXTEMPORE COMPETITION",
		type: "SOLO",
		link: "/hle",
	},
	{
		event: "MR. & MRS. ANTARAGNI",
		comp: "MR. & MRS. ANTARAGNI",
		desc: "BEAUTY, CONFIDENCE AND INTELLIGENCE AT THE SAME POINT",
		type: "SOLO",
		link: "/mnm",
	},
	{
		event: "MUSICALS",
		comp: "SANGAM",
		desc: "INDIAN CLASSICAL/FOLK(ANY) GROUP SINGING COMPETITION",
		type: "GROUP",
		link: "/musicals",
	},
	{
		event: "MUSICALS",
		comp: "ANTARAGNI IDOL ",
		desc: "SOLO SINGING COMPETITION",
		type: "SOLO",
		link: "/musicals",
	},
	{
		event: "MUSICALS",
		comp: "PAIR ON STAGE",
		desc: "DUO MUSICAL COMPETITION",
		type: "GROUP",
		link: "/musicals",
	},
	{
		event: "MUSICALS",
		comp: "UNPLUGGED",
		desc: "FUSION MUSICAL COMPETITION",
		type: "GROUP",
		link: "/musicals",
	},
	{
		event: "MUSICALS",
		comp: "SYMPHONY",
		desc: "INSTRUMENTAL BATTLE",
		type: "GROUP",
		link: "/musicals",
	},
	{
		event: "MUSICALS",
		comp: "A CAPPELLA",
		desc: "ENGLISH SINGING COMPETITION",
		type: "GROUP",
		link: "/musicals",
	},
	{
		event: "RITAMBHARA",
		comp: "RITAMBHARA",
		desc: "FASHION SHOW",
		type: "GROUP",
		link: "/ritambhara",
	},
	{
		event: "RITAMBHARA",
		comp: "DISENADOR",
		desc: "FASHION DESIGNING COMPETITION",
		type: "GROUP",
		link: "/ritambhara",
	},
	{
		event: "DEBATING",
		comp: "PARLIAMENTARY DEBATE",
		desc: "PARLIAMENTARY DEBATING COMPETITION",
		type: "SOLO",
		link: "/debate",
	},
	{
		event: "DEBATING",
		comp: "TURN COAT",
		desc: "TURN COAT COMPETITION",
		type: "SOLO",
		link: "/debate",
	},
	{
		event: "QUIZ",
		comp: "SPORTS QUIZ",
		desc: "SPORTS QUIZ",
		type: "SOLO",
		link: "/quiz",
	},
	{
		event: "QUIZ",
		comp: "MELA QUIZ",
		desc: "MELA QUIZ",
		type: "SOLO",
		link: "/quiz",
	},
	{
		event: "QUIZ",
		comp: "MOVIES & WEBSERIES QUIZ",
		desc: "MOVIES & WEBSERIES QUIZ",
		type: "SOLO",
		link: "/quiz",
	},
	{
		event: "QUIZ",
		comp: "INDIA QUIZ",
		desc: "INDIA QUIZ",
		type: "SOLO",
		link: "/quiz",
	},
	{
		event: "QUIZ",
		comp: "HELM QUIZ",
		desc: "HELM QUIZ",
		type: "SOLO",
		link: "/quiz",
	},
];