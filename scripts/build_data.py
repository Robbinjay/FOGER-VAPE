import os

bit35k = [
  ('banana-taffy-freeze', 'Banana Taffy Freeze', 'Sweet and creamy candied banana taffy blended with an invigorating arctic blast of icy menthol on the exhale. Long-lasting taste with high vapor density.'),
  ('blackberry-blueberry-freezer-jam', 'Blackberry Blueberry Freezer Jam', 'A rich medley of hand-picked wild blackberries and plump mountain blueberries churned into sweet, icy homemade freezer fruit jam.'),
  ('blueberry-freezer-jam', 'Blueberry Freezer Jam', 'Fresh crushed sweet blueberries simmered into a luscious fruit glaze and chilled to sub-zero temperatures for an all-day iced berry vape.'),
  ('blue-razz-ice', 'Blue Razz Ice', 'The award-winning fan favorite tangy electric blue raspberry slush flavor perfectly balanced with a revitalizing wave of cool menthol.'),
  ('cool-mint', 'Cool Mint', 'Crisp, clean, and ultra-refreshing garden spearmint leaves infused with an icy arctic breeze for an invigorating and pure menthol sensation.'),
  ('fcuking-fab', 'Fcuking FAB', 'An extraordinary and mysterious candy explosion blending exotic tropical fruits, sweet mixed berries, and a sugary rainbow confection finish.'),
  ('frozen-cherry', 'Frozen Cherry', 'Plump, ripe dark red cherries picked at peak sweetness, dipped into sparkling ice crystals for a frost-covered berry sensation.'),
  ('frozen-kiwi', 'Frozen Kiwi', 'Zesty green kiwi slices delivering a vibrant blend of sweet and tart tropical fruit notes enveloped in an icy cold blanket.'),
  ('frozen-peach', 'Frozen Peach', 'Sweet, juicy orchard peaches frozen solid for a crisp and deeply satisfying balance of southern nectar and chilling menthol.'),
  ('frozen-tropical-rainbow', 'Frozen Tropical Rainbow', 'A frosty kaleidoscope of exotic mango, passionfruit, sweet citrus, and mixed berry candy finished with a crisp menthol chill.'),
  ('frozen-vanilla', 'Frozen Vanilla', 'Rich, velvety Madagascar vanilla cream paired harmoniously with an unexpected frosty menthol touch for a smooth gourmet vape.'),
  ('georgia-peach', 'Georgia Peach', 'Authentic southern Georgia peach flavor loaded with aromatic, sun-drenched sweetness and luscious juice notes in every cloud.'),
  ('miami-mint', 'Miami Mint', 'The quintessential South Beach fresh blend of cooling sweet mint leaves, subtle citrus zest, and a smooth icy throat hit.'),
  ('orange-cranberry-lime-ice', 'Orange Cranberry Lime Ice', 'A cocktail-inspired fusion of bright Florida oranges, tart ruby cranberries, and zesty key lime finished with crushed ice.'),
  ('orange-freezer-jam', 'Orange Freezer Jam', 'Sweet, pulpy citrus orange marmalade preserve frozen into an icy, gourmet fruit vape with incredible sweetness and depth.'),
  ('passion-kiwi', 'Passion Kiwi', 'Exotic passionfruit infused with tangy sliced kiwi for a vibrant, juicy, sweet tropical vape sensation that never fades.'),
  ('peach-freezer-jam', 'Peach Freezer Jam', 'Sweet country peach preserves cooked down to perfection and frosted with pure ice crystals for a sugary, chilled dessert fruit vape.'),
  ('sour-apple-watermelon', 'Sour Apple Watermelon', 'Crisp granny smith sour green apple paired with refreshing sweet pink watermelon slices for an addictive sweet and sour balance.'),
  ('sour-blackberry-gush', 'Sour Blackberry Gush', 'Succulent wild blackberries bursting with a mouth-puckering sour fruit gush and sweet candied gummy undertones.'),
  ('sour-blueberry-gush', 'Sour Blueberry Gush', 'Sweet mountain blueberries coated in mouthwatering sour crystals that unleash an explosion of sweet and tart candy vapor.'),
  ('sour-cherry-gush', 'Sour Cherry Gush', 'Bold red cherries packed with an electric sour candy punch and an irresistible sweet fruit syrup finish.'),
  ('sour-grape-gush', 'Sour Grape Gush', 'Plump concord grapes infused with a tart sour candy bite that turns each inhale into a juicy grape candy feast.'),
  ('sour-kiwi-gush', 'Sour Kiwi Gush', 'Tangy green kiwi fruit with an explosive sour candy splash that elevates tropical vaping to high-voltage intensity.'),
  ('sour-mango-pineapple', 'Sour Mango Pineapple', 'Luscious golden mangoes blended with sharp, sour tropical pineapples for an exotic sweet and tangy island getaway.'),
  ('strawberry-burst', 'Strawberry Burst', 'Sweet, juicy garden strawberries exploding with chewy candy fruit flavor in every thick, aromatic cloud.'),
  ('strawberry-freezer-jam', 'Strawberry Freezer Jam', 'Homemade sweet strawberry preserve infused with a frosted chilling glaze for a dessert-like iced strawberry satisfaction.'),
  ('summer-mist', 'Summer Mist', 'A signature blend of sweet summer berries, sparkling pink lemonade, and delicate tropical fruits with an icy mist finish.'),
  ('watermelon-ice', 'Watermelon Ice', 'Mouthwatering, crisp pink watermelon slices layered over an icy bed of frosted menthol for a classic refreshing all-day vape.'),
  ('white-peach-raspberry', 'White Peach Raspberry', 'Delicate floral white peaches harmoniously paired with tart wild raspberries for a sophisticated, juicy fruit profile.'),
  ('wintergreen', 'Wintergreen', 'Bold, aromatic wintergreen herb leaves delivering an intensely cool, refreshing, and sweet frosty mint experience.')
]

switch_pro_flavors = [
  ('berry-bliss', 'Berry Bliss', 'A luscious medley of ripe sun-drenched strawberries, wild mountain blackberries, sweet blueberries, and tart raspberries.'),
  ('blackberry-blueberry', 'Blackberry Blueberry', 'Juicy hand-picked wild blackberries and sweet blueberries delivering a rich, double-berry fruit burst.'),
  ('blue-dragon', 'Blue Dragon', 'Exotic Asian pink dragonfruit layered over electrifying blue raspberries with a frosty sub-zero touch.'),
  ('blue-rancher-b-pop', 'Blue Rancher B Pop', 'Sweet and tangy blue raspberry hard candy with a fizzy candy bubble pop finish.'),
  ('blue-razz-ice', 'Blue Razz Ice', 'The timeless fan-favorite blue raspberry slush flavor supercharged with refreshing arctic menthol.'),
  ('blue-sour-raspberry', 'Blue Sour Raspberry', 'Mouth-puckering electric sour blue raspberries balanced with sweet candied berry crystals.'),
  ('blueberry-cotton-candy', 'Blueberry Cotton Candy', 'Carnival spun sugar infused with ripe mountain blueberries for a delightfully sweet and fluffy vape.'),
  ('blueberry-watermelon', 'Blueberry Watermelon', 'Crisp, juicy pink watermelon slices blended harmoniously with sweet plump blueberries.'),
  ('california-cherry', 'California Cherry', 'Deep, rich California Bing cherries delivering an authentic juicy orchard cherry profile.'),
  ('cherry-bomb', 'Cherry Bomb', 'An explosive blast of sweet candied maraschino cherries with high-intensity vapor sweetness.'),
  ('cherry-slush', 'Cherry Slush', 'Frosty red cherry Italian shaved ice slush beverage with an icy cooling throat hit.'),
  ('chocolate-cupcake', 'Chocolate Cupcake', 'Decadent bakery-fresh chocolate sponge cake topped with silky fudge buttercream frosting.'),
  ('clear', 'Clear', 'Pure, unflavored, ultra-clean and crisp vapor without added sweetener, aroma, or aftertaste.'),
  ('coconut-cupcake', 'Coconut Cupcake', 'Fluffy golden vanilla cupcake topped with toasted coconut shavings and rich vanilla icing.'),
  ('coffee', 'Coffee', 'Freshly brewed dark roasted espresso beans with a smooth crema undertone and rich aroma.'),
  ('cola-slush', 'Cola Slush', 'Effervescent vintage fountain cola blended over crushed ice crystals for a nostalgic soda chill.'),
  ('cool-mint', 'Cool Mint', 'Pure garden spearmint leaves paired with an arctic breeze for an invigorating, clean menthol puff.'),
  ('dragon-fruit-lemonade', 'Dragon Fruit Lemonade', 'Zesty fresh-squeezed yellow lemonade infused with vibrant exotic pink dragon fruit nectar.'),
  ('dragon-melon', 'Dragon Melon', 'Sweet honeydew and crisp juicy cantaloupe combined with delicate tropical dragon fruit.'),
  ('frozen-banana', 'Frozen Banana', 'Creamy sweet golden bananas frozen solid with an invigorating arctic frost chill.'),
  ('frozen-blackberry', 'Frozen Blackberry', 'Dark plump wild blackberries frozen to sub-zero temperatures for crisp and icy berry clouds.'),
  ('frozen-blueberry', 'Frozen Blueberry', 'Sun-ripened mountain blueberries frosted with pure menthol crystals for all-day berry coolness.'),
  ('frozen-lemon', 'Frozen Lemon', 'Tart, zesty lemon slices dipped into sparkling crushed ice for an electrifying citrus freeze.'),
  ('frozen-pineapple', 'Frozen Pineapple', 'Golden juicy tropical pineapple chunks served over a bed of sub-zero arctic ice.'),
  ('frozen-watermelon', 'Frozen Watermelon', 'Refreshing summer pink watermelon slices coated in a frosty, thirst-quenching winter chill.'),
  ('grape-slush', 'Grape Slush', 'Sweet purple concord grape ice beverage with a frosty, juicy candy kick on every inhale.'),
  ('gum-mint', 'Gum Mint', 'Classic spearmint bubblegum flavor with chewy sweetness and a long-lasting cool mint aroma.'),
  ('gummy-bear', 'Gummy Bear', 'Assorted colorful fruity gummy candy bears bursting with sweet, chewy nostalgic goodness.'),
  ('hawaiian-punch', 'Hawaiian Punch', 'Tropical island fruit punch loaded with pineapple, citrus orange, guava, and passionfruit.'),
  ('icy-mint', 'Icy Mint', 'Extra-strength arctic peppermint menthol delivering a blast of crisp, polar cold freshness.'),
  ('juicy-peach-ice', 'Juicy Peach Ice', 'Ripe, dripping orchard peaches blended with a clean and cooling icy menthol exhale.'),
  ('kiwi-dragon-berry', 'Kiwi Dragon Berry', 'Zesty green kiwi, exotic pink dragon fruit, and sweet mixed berries in an exotic trio.'),
  ('lemon-heads', 'Lemon Heads', 'Nostalgic sweet and sour lemon hard candy with an intense citrus sugar punch.'),
  ('lime-berry-orange', 'Lime Berry Orange', 'Zesty key lime, sweet mixed forest berries, and sunny Florida citrus orange in a radiant blend.'),
  ('meta-moon', 'Meta Moon', 'An out-of-this-world cosmic blend of sweet papaya, juicy strawberry, and cooling watermelon.'),
  ('mexico-mango', 'Mexico Mango', 'Authentic sweet, ripe Mexican Ataulfo mango with dripping tropical nectar notes.'),
  ('miami-mint', 'Miami Mint', 'South Beach inspired sweet garden mint leaves with subtle citrus zest and a crisp icy finish.'),
  ('omg-b-pop', 'OMG B Pop', 'Juicy orange, tropical mango, and guava blended with fizzy bubble pop candy sweetness.'),
  ('orange-slush', 'Orange Slush', 'Sun-drenched orange citrus syrup poured over frosty crushed ice for a summer refresher.'),
  ('peach-slush', 'Peach Slush', 'Sweet Georgia peach puree blended into a frosty shaved-ice slushie for peak refreshment.'),
  ('pineapple-coconut-ice', 'Pineapple Coconut Ice', 'Creamy tropical piña colada blend of ripe pineapple, coconut cream, and crushed ice.'),
  ('pink-blue', 'Pink Blue', 'A sweet cotton candy fusion of spun pink sugar and electric blue raspberry candy.'),
  ('pink-lemonade', 'Pink Lemonade', 'Crisp freshly squeezed lemons sweetened with ripe red berry nectar and served ice cold.'),
  ('purple-passion-punch', 'Purple Passion Punch', 'Exotic purple passionfruit blended with tropical guava and island fruit punch.'),
  ('red-velvet-cupcake', 'Red Velvet Cupcake', 'Rich cocoa red velvet cake with a touch of vanilla and sweet cream cheese frosting.'),
  ('skittles-cupcake', 'Skittles Cupcake', 'Sweet frosted birthday cupcake infused with rainbow candied fruit flavor crystals.'),
  ('sour-apple-ice', 'Sour Apple Ice', 'Crisp, tart granny smith green apples paired with an icy menthol finish.'),
  ('sour-blue-dust', 'Sour Blue Dust', 'Mouth-watering sour blue raspberry powder candy with an electrifying sweet & sour tang.'),
  ('sour-cranapple', 'Sour Cranapple', 'Tart ruby red cranberries blended with sour green apples for a vibrant crisp vape.'),
  ('sour-punch', 'Sour Punch', 'Classic sour chewy candy straw flavor bursting with tart fruit sugar and tangy sweetness.'),
  ('strawberry-mango', 'Strawberry Mango', 'Sweet garden strawberries paired harmoniously with juicy golden tropical mangoes.'),
  ('strawnana-ice-cream', 'Strawnana Ice Cream', 'Creamy churned vanilla ice cream swirled with sweet strawberries and ripe bananas.')
]

switch_pro_pods = [
  ('berry-bliss-foger-switch-pro-pod-30k-puffs', 'Berry Bliss', 'A luscious medley of ripe strawberries, wild mountain blackberries, sweet blueberries, and tart raspberries in a 30K magnetic replacement pod.'),
  ('blackberry-blueberry-foger-switch-pro-pod-30k-puffs', 'Blackberry Blueberry', 'Juicy wild blackberries and plump blueberries delivering double berry satisfaction with mesh coil heating.'),
  ('blackberry-passion-refresher-foger-switch-pro-pod-30k-puffs', 'Blackberry Passion Refresher', 'Crisp iced beverage style blend of ripe dark blackberries and zesty exotic passion fruit nectar.'),
  ('blue-dragon-foger-switch-pro-pod-30k-puffs', 'Blue Dragon', 'Exotic pink dragon fruit layered over bright blue raspberries with a frosty sub-zero touch.'),
  ('blue-rancher-b-pop-foger-switch-pro-pod-30k-puffs', 'Blue Rancher B Pop', 'Sweet and tangy blue raspberry hard candy with a fizzy candy bubble pop finish.'),
  ('blue-razz-ice-foger-switch-pro-pod-30k-puffs', 'Blue Razz Ice', 'The award-winning fan favorite blue raspberry slush flavor supercharged with refreshing arctic menthol.'),
  ('blue-sour-raspberry-foger-switch-pro-pod-30k-puffs', 'Blue Sour Raspberry', 'Mouth-puckering electric sour blue raspberries balanced with sweet candied berry crystals.'),
  ('blueberry-cotton-candy-foger-switch-pro-pod-30k-puffs', 'Blueberry Cotton Candy', 'Carnival spun sugar infused with ripe mountain blueberries for a fluffy and sweet berry vapor.'),
  ('blueberry-watermelon-foger-switch-pro-pod-30k-puffs', 'Blueberry Watermelon', 'Crisp juicy pink watermelon slices blended harmoniously with sweet plump mountain blueberries.'),
  ('california-cherry-foger-switch-pro-pod-30k-puffs', 'California Cherry', 'Deep, rich California Bing cherries delivering an authentic juicy orchard cherry profile.'),
  ('cherry-bomb-foger-switch-pro-pod-30k-puffs', 'Cherry Bomb', 'An explosive blast of sweet candied maraschino cherries with high-intensity vapor sweetness.'),
  ('cherry-slush-foger-switch-pro-pod-30k-puffs', 'Cherry Slush', 'Frosty red cherry Italian shaved ice slush beverage with an icy cooling throat hit.'),
  ('chocolate-cupcake-foger-switch-pro-pod-30k-puffs', 'Chocolate Cupcake', 'Decadent bakery-fresh chocolate sponge cake topped with silky fudge buttercream frosting.'),
  ('clear-foger-switch-pro-pod-30k-puffs', 'Clear', 'Pure, unflavored, ultra-clean and crisp vapor without added sweetener, aroma, or aftertaste.'),
  ('coconut-cupcake-foger-switch-pro-pod-30k-puffs', 'Coconut Cupcake', 'Fluffy golden vanilla cupcake topped with toasted coconut shavings and rich vanilla icing.'),
  ('coffee-foger-switch-pro-pod-30k-puffs', 'Coffee', 'Freshly brewed dark roasted espresso beans with a smooth crema undertone and rich aroma.'),
  ('cola-slush-foger-switch-pro-pod-30k-puffs', 'Cola Slush', 'Effervescent vintage fountain cola blended over crushed ice crystals for a nostalgic soda chill.'),
  ('cool-mint-foger-switch-pro-pod-30k-puffs', 'Cool Mint', 'Pure garden spearmint leaves paired with an arctic breeze for an invigorating, clean menthol puff.'),
  ('dragon-fruit-lemonade-foger-switch-pro-pod-30k-puffs', 'Dragon Fruit Lemonade', 'Zesty fresh-squeezed yellow lemonade infused with vibrant exotic pink dragon fruit nectar.'),
  ('dragon-melon-foger-switch-pro-pod-30k-puffs', 'Dragon Melon', 'Sweet honeydew and crisp juicy cantaloupe combined with delicate tropical dragon fruit.'),
  ('frozen-banana-foger-switch-pro-pod-30k-puffs', 'Frozen Banana', 'Creamy sweet golden bananas frozen solid with an invigorating arctic frost chill.'),
  ('frozen-blackberry-foger-switch-pro-pod-30k-puffs', 'Frozen Blackberry', 'Dark plump wild blackberries frozen to sub-zero temperatures for crisp and icy berry clouds.'),
  ('frozen-blueberry-foger-switch-pro-pod-30k-puffs', 'Frozen Blueberry', 'Sun-ripened mountain blueberries frosted with pure menthol crystals for all-day berry coolness.'),
  ('frozen-lemon-foger-switch-pro-pod-30k-puffs', 'Frozen Lemon', 'Tart, zesty lemon slices dipped into sparkling crushed ice for an electrifying citrus freeze.'),
  ('frozen-orange-green-foger-switch-pro-pod-30k-puffs', 'Frozen Orange Green', 'Tangy green apple and bright Florida citrus orange blended over frosty sub-zero crushed ice.'),
  ('frozen-pineapple-foger-switch-pro-pod-30k-puffs', 'Frozen Pineapple', 'Golden juicy tropical pineapple chunks served over a bed of sub-zero arctic ice.'),
  ('frozen-strawberry-grapefruit-foger-switch-pro-pod-30k-puffs', 'Frozen Strawberry Grapefruit', 'Sweet garden strawberries paired with tart ruby red grapefruit and chilled with menthol.'),
  ('frozen-summer-pear-foger-switch-pro-pod-30k-puffs', 'Frozen Summer Pear', 'Crisp, delicate Asian summer pears chilled to frosty perfection for a smooth, refreshing puff.'),
  ('frozen-watermelon-foger-switch-pro-pod-30k-puffs', 'Frozen Watermelon', 'Refreshing summer pink watermelon slices coated in a frosty, thirst-quenching winter chill.'),
  ('frozen-wildberry-mix-foger-switch-pro-pod-30k-puffs', 'Frozen Wildberry Mix', 'An icy forest gathering of ripe raspberries, blueberries, blackberries, and strawberries.'),
  ('grape-slush-foger-switch-pro-pod-30k-puffs', 'Grape Slush', 'Sweet purple concord grape ice beverage with a frosty, juicy candy kick on every inhale.'),
  ('gum-mint-foger-switch-pro-pod-30k-puffs', 'Gum Mint', 'Classic spearmint bubblegum flavor with chewy sweetness and a long-lasting cool mint aroma.'),
  ('gummy-bear-foger-switch-pro-pod-30k-puffs', 'Gummy Bear', 'Assorted colorful fruity gummy candy bears bursting with sweet, chewy nostalgic goodness.'),
  ('hawaiian-punch-foger-switch-pro-pod-30k-puffs', 'Hawaiian Punch', 'Tropical island fruit punch loaded with pineapple, citrus orange, guava, and passionfruit.'),
  ('icy-mint-switch-pro-pod-30k-puffs', 'Icy Mint', 'Extra-strength arctic peppermint menthol delivering a blast of crisp, polar cold freshness.'),
  ('juicy-peach-ice-foger-switch-pro-pod-30k-puffs', 'Juicy Peach Ice', 'Ripe, dripping orchard peaches blended with a clean and cooling icy menthol exhale.'),
  ('kiwi-dragon-berry-foger-switch-pro-pod-30k-puffs', 'Kiwi Dragon Berry', 'Zesty green kiwi, exotic pink dragon fruit, and sweet mixed berries in an exotic trio.'),
  ('lemon-heads-foger-switch-pro-pod-30k-puffs', 'Lemon Heads', 'Nostalgic sweet and sour lemon hard candy with an intense citrus sugar punch.'),
  ('mango-pineapple-refresher-foger-switch-pro-pod-30k-puffs', 'Mango Pineapple Refresher', 'Tropical café refresher blending ripe mango nectar with fresh sliced pineapple over ice.'),
  ('meta-moon-foger-switch-pro-pod-30k-puffs', 'Meta Moon', 'An out-of-this-world cosmic blend of sweet papaya, juicy strawberry, and cooling watermelon.'),
  ('mexico-mango-foger-switch-pro-pod-30k-puffs', 'Mexico Mango', 'Authentic sweet, ripe Mexican Ataulfo mango with dripping tropical nectar notes.'),
  ('miami-mint-foger-switch-pro-pod-30k-puffs', 'Miami Mint', 'South Beach inspired sweet garden mint leaves with subtle citrus zest and a crisp icy finish.'),
  ('omg-b-pop-foger-switch-pro-pod-30k-puffs', 'OMG B Pop', 'Juicy orange, tropical mango, and guava blended with fizzy bubble pop candy sweetness.'),
  ('orange-dream-refresher-foger-switch-pro-pod-30k-puffs', 'Orange Dream Refresher', 'Creamy citrus dream beverage pairing sweet Valencia orange with smooth vanilla ice.'),
  ('orange-slush-foger-switch-pro-pod-30k-puffs', 'Orange Slush', 'Sun-drenched orange citrus syrup poured over frosty crushed ice for a summer refresher.'),
  ('peach-berries-refresher-foger-switch-pro-pod-30k-puffs', 'Peach Berries Refresher', 'Fresh orchard peaches infused with chilled wild berry iced tea for supreme all-day vaping.'),
  ('peach-slush-foger-switch-pro-pod-30k-puffs', 'Peach Slush', 'Sweet Georgia peach puree blended into a frosty shaved-ice slushie for peak refreshment.'),
  ('pineapple-coconut-ice-foger-switch-pro-pod-30k-puffs', 'Pineapple Coconut Ice', 'Creamy tropical piña colada blend of ripe pineapple, coconut cream, and crushed ice.'),
  ('pink-blue-foger-switch-pro-pod-30k-puffs', 'Pink Blue', 'A sweet cotton candy fusion of spun pink sugar and electric blue raspberry candy.'),
  ('pink-lemonade-foger-switch-pro-pod-30k-puffs', 'Pink Lemonade', 'Crisp freshly squeezed lemons sweetened with ripe red berry nectar and served ice cold.'),
  ('raspberry-watermelon-foger-switch-pro-pod-30k-puffs', 'Raspberry Watermelon', 'Tart ripe raspberries and juicy summer pink watermelon slices in a vibrant berry fusion.'),
  ('red-mix-refresher-foger-switch-pro-pod-30k-puffs', 'Red Mix Refresher', 'A tantalizing red fruit beverage blend of pomegranate, cranberry, strawberry, and ice.'),
  ('sour-punch-foger-switch-pro-pod-30k-puffs', 'Sour Punch', 'Classic sour chewy candy straw flavor bursting with tart fruit sugar and tangy sweetness.'),
  ('strawberry-mango-foger-switch-pro-pod-30k-puffs', 'Strawberry Mango', 'Sweet garden strawberries paired harmoniously with juicy golden tropical mangoes.')
]

code = '''export interface Product {
  id: string;
  slug: string;
  name: string;
  flavor?: string;
  description: string;
  price: number;
  image: string;
  category: string; // 'Foger Switch Pro' | 'Foger Bit 35K' | 'Switch Pro Pods' | 'Accessories'
  subCategory?: string; // 'Switch Pro Battery' | 'Flavor Enhancers' | 'Lanyards & Gear'
  series?: string;
  puffs?: string;
  nicotine?: string;
  features: string[];
  inStock?: boolean;
}

export const CATEGORIES = [
  'All',
  'Foger Switch Pro',
  'Foger Bit 35K',
  'Switch Pro Pods',
  'Accessories'
] as const;

export const ACCESSORY_SUBCATEGORIES = [
  'All Accessories',
  'Switch Pro Battery',
  'Chargers & Cables',
  'Foger Flavor Drops',
  'Lanyards & Gear'
] as const;

export const products: Product[] = [
  // Flagship Switch Pro Starter Kit
  {
    id: "foger-switch-pro-main-kit",
    slug: "foger-switch-pro-kit-30k-puffs",
    name: "Foger Switch Pro Kit 30K (Full Starter Kit)",
    flavor: "All 52 Flavors Available",
    description: "The Foger Switch Pro Kit is a revolutionary modular vaping ecosystem. It features an intelligent reusable power base with an OLED smart screen, adjustable airflow, and interchangeable 30,000 puff pre-filled magnetic pods. Texas Compliant and built for maximum sustainability.",
    price: 29.99,
    image: "/images/switch-pro-kit.jpg",
    category: "Foger Switch Pro",
    series: "Switch Pro Kit",
    puffs: "30,000 Puffs",
    nicotine: "5% (50mg)",
    inStock: true,
    features: ["Reusable Smart Battery Dock", "Up to 30,000 Puffs (Norm & Boost)", "Magnetic Quick-Snap Lock", "Dual Mesh Heating", "Texas Compliant Formula", "Type-C Fast Rechargeable"]
  },

  // Flagship Switch Pro Replacement Pod Hero
  {
    id: "foger-switch-pro-main-pod",
    slug: "foger-switch-pro-pod-30k-puffs",
    name: "Foger Switch Pro Pod 30K (Replacement Pod)",
    flavor: "All 54 Flavors Available",
    description: "Official replacement magnetic pre-filled pod for the Foger Switch Pro ecosystem. Massive 30,000 puff capacity with dual mesh coils, leak-proof design, and instant snap-on connection to your reusable Switch Pro smart battery dock.",
    price: 19.99,
    image: "/images/switch-pro-pod.jpg",
    category: "Switch Pro Pods",
    series: "Switch Pro Ecosystem",
    puffs: "30,000 Puffs",
    nicotine: "5% (50mg)",
    inStock: true,
    features: ["5% Nicotine Salt", "Up to 30,000 Puffs", "Magnetic Quick-Snap Lock", "Dual Mesh Heating", "Leak-Proof Tank", "54 Gourmet Flavors"]
  },

  // Flagship Bit 35K Hero Product
  {
    id: "foger-bit-35k-main",
    slug: "foger-bit-35k-puffs",
    name: "Foger Bit 35K Puffs (Flagship)",
    flavor: "All 30 Flavors Available",
    description: "The groundbreaking Foger Bit 35K Disposable Vape features dual power modes (35,000 puffs in Normal mode / 25,000 puffs in Boost mode), a revolutionary 360° curved OLED smart screen, dual mesh coil architecture, and a clear transparent e-liquid tank.",
    price: 24.99,
    image: "/images/foger-bit-35k.jpg",
    category: "Foger Bit 35K",
    series: "Bit 35K Series",
    puffs: "35,000 Puffs",
    nicotine: "5% (50mg)",
    inStock: true,
    features: ["5% Salt Nicotine", "Up to 35,000 Puffs (Norm / Boost)", "360° Curved OLED Smart Screen", "Dual Mesh Coil Technology", "Adjustable Airflow Switch", "Type-C Fast Rechargeable"]
  },
'''

# Add Switch Pro Kit Products (52 items)
code += '\n  // --- 52 Official Foger Switch Pro Kit 30K Flavors ---\n'
for slug_base, title, desc in switch_pro_flavors:
    code += f'''  {{
    id: "switch-pro-kit-{slug_base}",
    slug: "{slug_base}-foger-switch-pro-kit-30k-puffs",
    name: "{title} - Foger Switch Pro Kit 30K",
    flavor: "{title}",
    description: "{desc} Includes reusable smart battery dock and pre-filled magnetic 30,000 puff pod.",
    price: 29.99,
    image: "/images/switch-pro-kit.jpg",
    category: "Foger Switch Pro",
    series: "Switch Pro Kit",
    puffs: "30,000 Puffs",
    nicotine: "5% (50mg)",
    inStock: true,
    features: ["Reusable Smart Battery Dock", "30,000 Puffs (Norm & Boost)", "Magnetic Quick-Snap Lock", "Dual Mesh Coils", "OLED Smart Screen", "Texas Compliant"]
  }},
'''

# Add Switch Pro Pod Products (54 items)
code += '\n  // --- 54 Official Foger Switch Pro Pod 30K Flavors ---\n'
for handle, title, desc in switch_pro_pods:
    slug_base = handle.replace('-foger-switch-pro-pod-30k-puffs', '').replace('-switch-pro-pod-30k-puffs', '')
    code += f'''  {{
    id: "switch-pro-pod-{slug_base}",
    slug: "{handle}",
    name: "{title} - Foger Switch Pro Pod 30K",
    flavor: "{title}",
    description: "{desc}",
    price: 19.99,
    image: "/images/switch-pro-pod.jpg",
    category: "Switch Pro Pods",
    series: "Switch Pro Ecosystem",
    puffs: "30,000 Puffs",
    nicotine: "5% (50mg)",
    inStock: true,
    features: ["5% Nicotine Salt", "Up to 30,000 Puffs", "Magnetic Quick-Snap Lock", "Dual Mesh Heating", "Leak-Proof Tank", "Compatible with Switch Pro Dock"]
  }},
'''

# Add Bit 35K Products (30 items)
code += '\n  // --- 30 Official Foger Bit 35K Flavors ---\n'
for slug_base, title, desc in bit35k:
    code += f'''  {{
    id: "bit-35k-{slug_base}",
    slug: "{slug_base}-foger-bit-35k-puffs",
    name: "{title} - Foger Bit 35K",
    flavor: "{title}",
    description: "{desc}",
    price: 24.99,
    image: "/images/foger-bit-35k.jpg",
    category: "Foger Bit 35K",
    series: "Bit 35K Series",
    puffs: "35,000 Puffs",
    nicotine: "5% (50mg)",
    inStock: true,
    features: ["5% Salt Nicotine", "Up to 35,000 Puffs (Norm/Boost)", "360° Curved OLED Screen", "Dual Mesh Coils", "Adjustable Airflow"]
  }},
'''

# Add CT10000 and Accessories with Subcategories
code += '''
  // Classic Series
  {
    id: "ct-10000",
    slug: "foger-ct10000",
    name: "Foger CT10000 Clear Tank",
    flavor: "Clear Tank Classic",
    description: "The classic Foger clear tank disposable. See your e-liquid level clearly while enjoying 10,000 puffs of pure flavor.",
    price: 16.99,
    image: "/images/foger-bit-35k.jpg",
    category: "Foger Bit 35K",
    series: "Classic Series",
    puffs: "10,000 Puffs",
    nicotine: "5% (50mg)",
    inStock: true,
    features: ["5% Nicotine", "Up to 10,000 Puffs", "Clear E-Liquid Tank", "Mesh Coil", "650mAh Battery"]
  },

  // --- ACCESSORIES & HARDWARE (Subcategories: Switch Pro Battery, Flavor Enhancers, Lanyards & Gear) ---
  {
    id: "foger-switch-pro-battery",
    slug: "foger-switch-pro-battery",
    name: "Foger Switch Pro Battery (1200mAh Charging Dock)",
    flavor: "Assorted Matte & Metallic Colors",
    description: "Official Foger Switch Pro reusable 1200mAh rechargeable smart battery charging dock. Designed exclusively for all compatible Foger Switch Pro Pods. Features high-speed USB Type-C charging, overcharging protection circuit, and smart encrypted pod recognition. Compact dimensions of 78.80 x 26.60 x 27.66 mm.",
    price: 11.99,
    image: "/images/switch-battery.jpg",
    category: "Accessories",
    subCategory: "Switch Pro Battery",
    series: "Switch Pro Hardware",
    nicotine: "0% (Hardware Only)",
    puffs: "1200mAh Dock",
    inStock: true,
    features: [
      "1200mAh High-Density Rechargeable Cell",
      "USB Type-C Fast Charging",
      "Compact Dimensions: 78.80 x 26.60 x 27.66 mm",
      "Overcharging & Short-Circuit Safety Circuit",
      "Encrypted Pod Recognition System",
      "Compatible with All 54 Switch Pro Pods"
    ]
  },
  {
    id: "foger-switch-pro-battery-black",
    slug: "foger-switch-pro-battery-obsidian-black",
    name: "Foger Switch Pro Battery - Obsidian Black",
    flavor: "Obsidian Black Finish",
    description: "Official Foger Switch Pro 1200mAh rechargeable smart charging dock in sleek matte Obsidian Black. High-speed Type-C charging, overcharge protection, and magnetic snap-in lock.",
    price: 11.99,
    image: "/images/switch-battery.jpg",
    category: "Accessories",
    subCategory: "Switch Pro Battery",
    series: "Switch Pro Hardware",
    nicotine: "0% (Hardware Only)",
    puffs: "1200mAh Dock",
    inStock: true,
    features: [
      "1200mAh High-Density Battery",
      "Matte Obsidian Black Exterior",
      "USB Type-C Fast Charging",
      "Overcharging Safety Protection",
      "Compatible with All Switch Pro Pods"
    ]
  },
  {
    id: "foger-switch-pro-battery-cyan",
    slug: "foger-switch-pro-battery-aurora-cyan",
    name: "Foger Switch Pro Battery - Aurora Cyan",
    flavor: "Aurora Cyan Metallic Finish",
    description: "Official Foger Switch Pro 1200mAh rechargeable smart charging dock in vibrant metallic Aurora Cyan. High-speed Type-C charging, overcharge protection, and magnetic snap-in lock.",
    price: 11.99,
    image: "/images/switch-battery.jpg",
    category: "Accessories",
    subCategory: "Switch Pro Battery",
    series: "Switch Pro Hardware",
    nicotine: "0% (Hardware Only)",
    puffs: "1200mAh Dock",
    inStock: true,
    features: [
      "1200mAh High-Density Battery",
      "Vibrant Aurora Cyan Metallic Chassis",
      "USB Type-C Fast Charging",
      "Overcharging Safety Protection",
      "Compatible with All Switch Pro Pods"
    ]
  },
  {
    id: "foger-switch-pro-battery-purple",
    slug: "foger-switch-pro-battery-royal-purple",
    name: "Foger Switch Pro Battery - Royal Purple",
    flavor: "Royal Purple Metallic Finish",
    description: "Official Foger Switch Pro 1200mAh rechargeable smart charging dock in regal metallic Royal Purple. High-speed Type-C charging, overcharge protection, and magnetic snap-in lock.",
    price: 11.99,
    image: "/images/switch-battery.jpg",
    category: "Accessories",
    subCategory: "Switch Pro Battery",
    series: "Switch Pro Hardware",
    nicotine: "0% (Hardware Only)",
    puffs: "1200mAh Dock",
    inStock: true,
    features: [
      "1200mAh High-Density Battery",
      "Regal Royal Purple Metallic Finish",
      "USB Type-C Fast Charging",
      "Overcharging Safety Protection",
      "Compatible with All Switch Pro Pods"
    ]
  },
  {
    id: "foger-dual-port-wall-charger-25w",
    slug: "foger-xpress-gear-dual-port-25w-wall-charger",
    name: "Xpress Gear Dual Port 25W Wall Charger",
    flavor: "Dual Port Fast Charger",
    description: "Official Foger Xpress Gear 25W Dual Port Wall Charger equipped with USB-C Power Delivery (PD) and USB-A 3.0 outputs. Built with over-voltage, short-circuit, and smart amperage regulation specifically engineered for safe charging of Foger Switch Pro battery docks and Foger Bit 35K devices.",
    price: 12.99,
    image: "/images/charger-cable.jpg",
    category: "Accessories",
    subCategory: "Chargers & Cables",
    series: "Charging Gear",
    nicotine: "0% (Hardware Only)",
    puffs: "25W Dual Port",
    inStock: true,
    features: [
      "25W USB-C Power Delivery Output",
      "USB-A 3.0 Secondary Quick Port",
      "Safe 5V/1A Vape Voltage Regulation",
      "Surge & Overheating Circuit Protection",
      "Foldable Compact Travel Prongs"
    ]
  },
  {
    id: "foger-type-c-cable-3ft",
    slug: "foger-type-c-fast-charging-braided-cable-3ft",
    name: "Foger Type-C Fast Charging Cable (3.3ft / 1m)",
    flavor: "3.3ft Braided Nylon Cable",
    description: "High-durability nylon braided USB-C to USB-C charging cable (3.3ft / 1m). Engineered with reinforced strain relief and pure copper wiring for steady 5V/1A current delivery to Foger Switch Pro power docks and Bit 35K devices.",
    price: 7.99,
    image: "/images/charger-cable.jpg",
    category: "Accessories",
    subCategory: "Chargers & Cables",
    series: "Charging Gear",
    nicotine: "0% (Hardware Only)",
    puffs: "3.3ft Braided",
    inStock: true,
    features: [
      "3.3ft (1m) Heavy-Duty Braided Nylon",
      "USB-C to USB-C Reversible Connectors",
      "Tested for 10,000+ Anti-Fray Bends",
      "Safe 5V/1A Charging Current Delivery",
      "Tangle-Free Ultra-Durable Design"
    ]
  },
  {
    id: "foger-type-c-cable-6ft",
    slug: "foger-type-c-fast-charging-braided-cable-6ft",
    name: "Foger Type-C Fast Charging Cable (6.6ft / 2m)",
    flavor: "6.6ft Extended Braided Cable",
    description: "Extra-long 6.6ft (2m) heavy-duty braided USB-C charging cable. Provides maximum flexibility when charging your Foger devices at your desk, nightstand, or vehicle without sacrificing charge speed or stability.",
    price: 9.99,
    image: "/images/charger-cable.jpg",
    category: "Accessories",
    subCategory: "Chargers & Cables",
    series: "Charging Gear",
    nicotine: "0% (Hardware Only)",
    puffs: "6.6ft Extended",
    inStock: true,
    features: [
      "6.6ft (2m) Extended Reach Cable",
      "Heavy-Duty Armor Braided Nylon",
      "Reinforced Aluminum Alloy Connector Shells",
      "Safe Continuous Power Delivery",
      "Compatible with All USB-C Foger Devices"
    ]
  },
  {
    id: "foger-switch-pro-magnetic-cable",
    slug: "foger-switch-pro-magnetic-usb-c-charging-cable",
    name: "Foger Switch Pro 4-Pin Magnetic Charger Cable",
    flavor: "Magnetic Dock Cable",
    description: "Dedicated 4-pin magnetic snap-on charging cable engineered specifically for the bottom magnetic dock port of the Foger Switch Pro 1200mAh battery. Instant magnetic alignment for secure, effortless docking and charging.",
    price: 8.99,
    image: "/images/charger-cable.jpg",
    category: "Accessories",
    subCategory: "Chargers & Cables",
    series: "Charging Gear",
    nicotine: "0% (Hardware Only)",
    puffs: "Magnetic 4-Pin",
    inStock: true,
    features: [
      "Strong Rare-Earth Magnetic Snap Alignment",
      "Dedicated 4-Pin Switch Pro Dock Contacts",
      "Standard USB-C Input Interface",
      "Travel-Friendly 3.3ft Length",
      "Over-Current Safe Dock Regulation"
    ]
  },
  {
    id: "foger-3-in-1-universal-cable",
    slug: "foger-3-in-1-universal-multi-charging-cable",
    name: "Foger 3-in-1 Universal Multi-Tip Charging Cable",
    flavor: "3-in-1 Multi Cable",
    description: "All-in-one heavy-duty braided universal charging cable with USB-C, Lightning, and Micro-USB heads. Charge your Foger vapes, smartphone, and portable electronics simultaneously from a single USB port.",
    price: 10.99,
    image: "/images/charger-cable.jpg",
    category: "Accessories",
    subCategory: "Chargers & Cables",
    series: "Charging Gear",
    nicotine: "0% (Hardware Only)",
    puffs: "3-in-1 Universal",
    inStock: true,
    features: [
      "3-in-1 Connectors (USB-C / Lightning / Micro-USB)",
      "Charge Multiple Devices Simultaneously",
      "Durable Double-Braided Exterior",
      "Universal 5V Multi-Device Power Distribution",
      "Reinforced Strain-Relief Joint Protectors"
    ]
  },
  {
    id: "foger-flavor-drops-icy-menthol",
    slug: "foger-flavor-drops-icy-menthol-freeze-30ml",
    name: "Foger Flavor Drops - Icy Menthol Freeze (30ml)",
    flavor: "Icy Menthol Freeze",
    description: "Official Foger Flavor Drops formulated with arctic chill menthol extracts. Add crisp, cooling intensity to any puff or pod with precision micro-dropper bottle control.",
    price: 9.99,
    image: "/images/flavor-drops.jpg",
    category: "Accessories",
    subCategory: "Foger Flavor Drops",
    series: "Flavor Drops",
    nicotine: "0% (Flavor Only)",
    puffs: "30ml Squeeze Bottle",
    inStock: true,
    features: [
      "Ultra-Pure Arctic Menthol Chill Crystals",
      "Precision Micro-Drip Needle Tip",
      "Compatible with All Pods & Aromatics",
      "Zero Nicotine Pure Flavor Formulation",
      "Child-Resistant Leakproof Safety Cap"
    ]
  },
  {
    id: "foger-flavor-drops-sweet-candy",
    slug: "foger-flavor-drops-sweet-candy-burst-30ml",
    name: "Foger Flavor Drops - Sweet Candy Burst (30ml)",
    flavor: "Sweet Candy Burst",
    description: "Infuse your vaping experience with vibrant sugary sweetness. Formulated with authentic B-Burst sweet confectionery essence for a mouthwatering candy finish.",
    price: 9.99,
    image: "/images/flavor-drops.jpg",
    category: "Accessories",
    subCategory: "Foger Flavor Drops",
    series: "Flavor Drops",
    nicotine: "0% (Flavor Only)",
    puffs: "30ml Squeeze Bottle",
    inStock: true,
    features: [
      "Concentrated Sugary Candy B-Burst Notes",
      "Enhances Natural Fruit & Dessert Flavors",
      "Food-Grade Organic Flavoring Compounds",
      "Zero Nicotine Pure Flavor Formulation",
      "Precision Needle Dispenser"
    ]
  },
  {
    id: "foger-flavor-drops-sour-punch",
    slug: "foger-flavor-drops-sour-punch-infusion-30ml",
    name: "Foger Flavor Drops - Sour Punch Infusion (30ml)",
    flavor: "Sour Punch Infusion",
    description: "Turn any mild fruit profile into a tangy, mouth-puckering sensation. Foger Sour Punch Infusion drops deliver crisp citric notes and zesty tartness with every drop.",
    price: 9.99,
    image: "/images/flavor-drops.jpg",
    category: "Accessories",
    subCategory: "Foger Flavor Drops",
    series: "Flavor Drops",
    nicotine: "0% (Flavor Only)",
    puffs: "30ml Squeeze Bottle",
    inStock: true,
    features: [
      "Zesty Citrus & Tart Malic Acid Infusion",
      "Transforms Sweet Flavors into Sour Candy",
      "30ml Extended Capacity Bottle",
      "Zero Nicotine Pure Flavor Formulation",
      "Precision Micro-Drip Applicator"
    ]
  },
  {
    id: "foger-flavor-drops-tropical-mango",
    slug: "foger-flavor-drops-tropical-mango-passion-30ml",
    name: "Foger Flavor Drops - Tropical Mango Passion (30ml)",
    flavor: "Tropical Mango Passion",
    description: "Exotic lush mango and golden passion fruit extract drops. Enhances any vapor with rich sun-ripened tropical sweetness and aromatic floral nectar notes.",
    price: 9.99,
    image: "/images/flavor-drops.jpg",
    category: "Accessories",
    subCategory: "Foger Flavor Drops",
    series: "Flavor Drops",
    nicotine: "0% (Flavor Only)",
    puffs: "30ml Squeeze Bottle",
    inStock: true,
    features: [
      "Ripe Alphonso Mango & Passionfruit Extracts",
      "Rich Aromatic Tropical Vapor Cloud Enhancement",
      "Smooth Natural Fruit Sweetness",
      "Zero Nicotine Pure Flavor Formulation",
      "Leakproof Needle-Tip Dropper"
    ]
  },
  {
    id: "foger-flavor-drops-berry-freezer-jam",
    slug: "foger-flavor-drops-berry-freezer-jam-30ml",
    name: "Foger Flavor Drops - Berry Freezer Jam (30ml)",
    flavor: "Berry Freezer Jam",
    description: "Inspired by the hit Foger Bit 35K Freezer Jam series. A rich fusion of wild blackberries, blueberries, sweet compote, and light frost crystals in concentrated drop form.",
    price: 9.99,
    image: "/images/flavor-drops.jpg",
    category: "Accessories",
    subCategory: "Foger Flavor Drops",
    series: "Flavor Drops",
    nicotine: "0% (Flavor Only)",
    puffs: "30ml Squeeze Bottle",
    inStock: true,
    features: [
      "Blackberry Blueberry Sweet Jam Reduction",
      "Subtle Frozen Frost Undertone",
      "Deep Fruit Flavor Depth Booster",
      "Zero Nicotine Pure Flavor Formulation",
      "Precision Micro-Dropper Bottle"
    ]
  },
  {
    id: "foger-flavor-drops-variety-4pack",
    slug: "foger-flavor-drops-variety-4-pack-master-bundle",
    name: "Foger Flavor Drops - Variety 4-Pack Master Bundle",
    flavor: "Variety 4-Pack (4x 30ml)",
    description: "The ultimate flavor customization toolkit. Includes 4 full-sized 30ml bottles: Icy Menthol Freeze, Sweet Candy Burst, Sour Punch Infusion, and Tropical Mango Passion.",
    price: 29.99,
    image: "/images/flavor-drops.jpg",
    category: "Accessories",
    subCategory: "Foger Flavor Drops",
    series: "Flavor Drops",
    nicotine: "0% (Flavor Only)",
    puffs: "4x 30ml Bottles (120ml Total)",
    inStock: true,
    features: [
      "Complete 4-Flavor Arsenal (Menthol, Candy, Sour, Mango)",
      "Total 120ml Concentrated Flavor Volume",
      "Save $10 Compared to Buying Individually",
      "Custom Blend Ratio Mixing Guide Included",
      "Zero Nicotine Pure Flavor Formulations"
    ]
  },
  {
    id: "lanyard",
    slug: "foger-lanyard",
    name: "Foger Branded Silicone Lanyard",
    flavor: "Branded Accessory",
    description: "Keep your Foger devices close and secure with our premium branded lanyard featuring a durable silicone ring holder.",
    price: 5.99,
    image: "/images/switch-battery.jpg",
    category: "Accessories",
    subCategory: "Lanyards & Gear",
    series: "Accessories",
    inStock: true,
    features: ["Durable Material", "Quick Release Clasp", "Universal Silicone Ring", "Bold Foger Branding"]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string, subCategory?: string): Product[] {
  if (category === 'All' || !category) {
    return products;
  }
  return products.filter(p => {
    const catMatch = p.category.toLowerCase() === category.toLowerCase();
    if (!subCategory || subCategory === 'All' || subCategory === 'All Accessories') {
      return catMatch;
    }
    return catMatch && p.subCategory?.toLowerCase() === subCategory.toLowerCase();
  });
}
'''

target_path = os.path.abspath('./lib/data.ts')
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(code)

print('Successfully generated', target_path)
