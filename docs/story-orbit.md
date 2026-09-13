# Education letters

EDUCATION_ENTRIES in StoryEducation.tsx maps degree, bootcamp and school to three separate envelope buttons. Each button renders only its matching entryId in the existing card. No card is mounted on initial entry; the card container is also hidden until selection. No modal or backdrop is used.

ORBIT_SETTINGS in GlobeOrbit.tsx controls open/close durations, angular speed and radius multipliers. Initial angles are evenly distributed by the number of entries. Only the selected letter pauses while opening; closing returns to its saved angle. Keyboard focus pauses a letter for easier activation. Escape or the return button closes the card.

The orbit stays in front of the globe. Reduced motion freezes the orbit. Timelines and event listeners are cleaned up on unmount.
