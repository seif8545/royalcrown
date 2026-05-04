# Adding real photos

The site currently uses themed SVG placeholders in `public/images/placeholders/`. To swap any one of them for a real photo:

1. Save your photo as a JPG (1024×768 or larger, 16:10 / 4:3 ratio works best).
2. Name it after the slug exactly — see the table below.
3. Drop it into this folder (`public/images/`).
4. In `src/data.ts`, change the matching line from
   `image: ph("king-room")`
   to
   `image: "/images/king-room.jpg"`
5. Save and refresh — done. No rebuild needed in dev mode.

## Slug → filename map

### Hero slides
| Where | Save as |
|---|---|
| Slide 1 (Pyramids hero) | `hero-pyramids.jpg` |
| Slide 2 (Suites) | `hero-suites.jpg` |
| Slide 3 (Sunset) | `hero-cairo-sunset.jpg` |
| Slide 4 (Day Tours) | `hero-day-tours.jpg` |

### Rooms
| Room | Save as |
|---|---|
| Royal King Room | `king-room.jpg` |
| Standard Single Room | `standard-single-room.jpg` |
| Standard Twin Room | `standard-twin-room.jpg` |
| Deluxe Double Room | `deluxe-double-room.jpg` |
| Superior Double / Twin | `superior-double-or-twin-room-with-city-view.jpg` |
| Standard Triple Room | `standard-triple-room.jpg` |
| Triple Room with View | `triple-room-with-view.jpg` |
| Premium Quadruple Room | `premium-quadruple-room.jpg` |

### Day tours
| Tour | Save as |
|---|---|
| Giza Pyramids | `giza-pyramids.jpg` |
| Saqqara, Memphis & Dahshour | `saqqara-memphis-dahshour.jpg` |
| Cairo City Tour | `cairo-city-tour.jpg` |
| Bike Tour to the Pyramids | `bike-tour-pyramids.jpg` |
| Dinner with Pyramids View | `dinner-pyramids-view.jpg` |
| Dinner Nile Cruise | `dinner-nile-cruise.jpg` |
| Sound & Light Show | `sound-and-light-show.jpg` |
| Alexandria Day Tour | `alexandria-day-tour.jpg` |
| Nile Cruise — Aswan & Luxor | `nile-cruise-aswan-luxor.jpg` |
| Red Sea Day Trip — El Sokna | `red-sea-el-sokna.jpg` |
| El Fayoum Oasis | `el-fayoum-oasis.jpg` |
| Saint Catherine & Mount Sinai | `saint-catherine-mount-sinai.jpg` |

## Easiest source for real photos

You're the property owner — log in to your Booking extranet at **admin.booking.com → Property → Photos**. There's a download button next to each photo. The originals are higher resolution than what's served on the public listing.
