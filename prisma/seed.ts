import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...\n')

  // Nettoyer la base de données
  console.log('🧹 Nettoyage de la base de données...')
  await prisma.orderItem.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.order.deleteMany()
  await prisma.tableAssignment.deleteMany()
  await prisma.premiumClient.deleteMany()
  await prisma.menu.deleteMany()
  await prisma.table.deleteMany()
  await prisma.user.deleteMany()
  console.log('✅ Base de données nettoyée\n')

  // Créer des utilisateurs
  console.log('👤 Création des utilisateurs...')
  const hashedPassword = await bcrypt.hash('password123', 12)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@acoustic-club.com',
      password: hashedPassword,
      name: 'Admin Principal',
      role: 'ADMIN',
      phone: '+33 6 12 34 56 78'
    }
  })
  console.log(`✅ Admin créé: ${admin.email}`)

  const serveur1 = await prisma.user.create({
    data: {
      email: 'serveur@acoustic-club.com',
      password: hashedPassword,
      name: 'Jean Serveur',
      role: 'SERVEUR',
      phone: '+33 6 23 45 67 89'
    }
  })
  console.log(`✅ Serveur créé: ${serveur1.email}`)

  const client1 = await prisma.user.create({
    data: {
      email: 'client@acoustic-club.com',
      password: hashedPassword,
      name: 'Marie Client',
      role: 'CLIENT',
      phone: '+33 6 34 56 78 90'
    }
  })
  console.log(`✅ Client créé: ${client1.email}`)

  const premiumUser = await prisma.user.create({
    data: {
      email: 'premium@acoustic-club.com',
      password: hashedPassword,
      name: 'Pierre Premium',
      role: 'PREMIUM',
      phone: '+33 6 45 67 89 01',
      premiumProfile: {
        create: {
          points: 500,
          tier: 'GOLD',
          discountPercent: 15
        }
      }
    }
  })
  console.log(`✅ Client Premium créé: ${premiumUser.email}\n`)

  // Créer des tables
  console.log('🪑 Création des tables...')
  const tables = []
  for (let i = 1; i <= 20; i++) {
    const location = i <= 8 ? 'Intérieur' : i <= 15 ? 'Terrasse' : 'VIP'
    const capacity = i <= 10 ? 4 : i <= 15 ? 6 : 8
    
    const table = await prisma.table.create({
      data: {
        number: i,
        capacity,
        location,
        status: i <= 5 ? 'OCCUPEE' : i <= 15 ? 'LIBRE' : 'RESERVEE'
      }
    })
    tables.push(table)
  }
  console.log(`✅ ${tables.length} tables créées\n`)

  // Créer des menus
  console.log('🍽️ Création du menu...')
  
  // Entrées
  const entrees = [
    { name: 'Salade César', description: 'Salade romaine, poulet grillé, parmesan, croûtons', price: 12.5, prepTime: 10 },
    { name: 'Soupe à l\'oignon', description: 'Soupe gratinée maison', price: 9.0, prepTime: 15 },
    { name: 'Carpaccio de bœuf', description: 'Fines tranches de bœuf, roquette, parmesan', price: 14.0, prepTime: 8 },
    { name: 'Velouté de potiron', description: 'Crème fraîche, croûtons', price: 8.5, prepTime: 12 }
  ]

  for (const entree of entrees) {
    await prisma.menu.create({
      data: { ...entree, category: 'ENTREE', available: true }
    })
  }
  console.log(`✅ ${entrees.length} entrées créées`)

  // Plats
  const plats = [
    { name: 'Burger Acoustic', description: 'Pain maison, steak 180g, cheddar, bacon, frites', price: 18.5, prepTime: 20 },
    { name: 'Pavé de saumon', description: 'Saumon grillé, légumes de saison, riz', price: 22.0, prepTime: 25 },
    { name: 'Entrecôte grillée', description: 'Entrecôte 300g, frites maison, sauce au poivre', price: 26.5, prepTime: 25 },
    { name: 'Risotto aux champignons', description: 'Risotto crémeux, champignons frais, parmesan', price: 17.0, prepTime: 22 },
    { name: 'Fish & Chips', description: 'Cabillaud pané, frites, sauce tartare', price: 16.5, prepTime: 18 },
    { name: 'Pâtes carbonara', description: 'Pâtes fraîches, lardons, crème, parmesan', price: 15.0, prepTime: 15 }
  ]

  for (const plat of plats) {
    await prisma.menu.create({
      data: { ...plat, category: 'PLAT', available: true }
    })
  }
  console.log(`✅ ${plats.length} plats créés`)

  // Desserts
  const desserts = [
    { name: 'Tiramisu maison', description: 'Mascarpone, café, cacao', price: 8.0, prepTime: 5 },
    { name: 'Tarte citron meringuée', description: 'Tarte fraîche du jour', price: 7.5, prepTime: 5 },
    { name: 'Fondant au chocolat', description: 'Cœur coulant, glace vanille', price: 9.0, prepTime: 12 },
    { name: 'Salade de fruits frais', description: 'Fruits de saison', price: 6.5, prepTime: 5 }
  ]

  for (const dessert of desserts) {
    await prisma.menu.create({
      data: { ...dessert, category: 'DESSERT', available: true }
    })
  }
  console.log(`✅ ${desserts.length} desserts créés`)

  // Boissons
  const boissons = [
    { name: 'Coca-Cola', description: '33cl', price: 4.0, category: 'BOISSON' },
    { name: 'Perrier', description: '33cl', price: 4.5, category: 'BOISSON' },
    { name: 'Jus d\'orange', description: 'Pressé minute', price: 5.5, category: 'BOISSON' },
    { name: 'Café expresso', description: 'Arabica sélection', price: 2.5, category: 'BOISSON' },
    { name: 'Bière pression', description: '50cl', price: 6.5, category: 'ALCOOL' },
    { name: 'Vin rouge (verre)', description: 'Bordeaux AOC', price: 7.0, category: 'ALCOOL' },
    { name: 'Vin blanc (verre)', description: 'Chardonnay', price: 7.0, category: 'ALCOOL' },
    { name: 'Mojito', description: 'Rhum, menthe, citron vert', price: 10.0, category: 'COCKTAIL' },
    { name: 'Piña Colada', description: 'Rhum, ananas, coco', price: 11.0, category: 'COCKTAIL' },
    { name: 'Cosmopolitan', description: 'Vodka, cranberry, citron', price: 12.0, category: 'COCKTAIL' }
  ]

  for (const boisson of boissons) {
    await prisma.menu.create({
      data: { ...boisson, available: true, prepTime: boisson.category === 'COCKTAIL' ? 8 : 2 }
    })
  }
  console.log(`✅ ${boissons.length} boissons créées\n`)

  // Créer des commandes exemple
  console.log('📋 Création de commandes exemple...')
  
  const menuItems = await prisma.menu.findMany()
  
  // Commande 1 : En cours
  const order1 = await prisma.order.create({
    data: {
      orderNumber: `AC${Date.now().toString().slice(-8)}`,
      userId: client1.id,
      tableId: tables[0].id,
      status: 'EN_PREPARATION',
      totalAmount: 0,
      items: {
        create: [
          {
            menuId: menuItems.find(m => m.name === 'Burger Acoustic')!.id,
            quantity: 2,
            price: 18.5
          },
          {
            menuId: menuItems.find(m => m.name === 'Coca-Cola')!.id,
            quantity: 2,
            price: 4.0
          }
        ]
      }
    }
  })

  await prisma.order.update({
    where: { id: order1.id },
    data: { totalAmount: (18.5 * 2) + (4.0 * 2) }
  })
  console.log(`✅ Commande ${order1.orderNumber} créée`)

  // Commande 2 : Payée
  const order2 = await prisma.order.create({
    data: {
      orderNumber: `AC${(Date.now() + 1000).toString().slice(-8)}`,
      userId: premiumUser.id,
      tableId: tables[1].id,
      status: 'PAYE',
      totalAmount: 0,
      items: {
        create: [
          {
            menuId: menuItems.find(m => m.name === 'Pavé de saumon')!.id,
            quantity: 1,
            price: 22.0
          },
          {
            menuId: menuItems.find(m => m.name === 'Vin blanc (verre)')!.id,
            quantity: 1,
            price: 7.0
          },
          {
            menuId: menuItems.find(m => m.name === 'Tiramisu maison')!.id,
            quantity: 1,
            price: 8.0
          }
        ]
      }
    }
  })

  await prisma.order.update({
    where: { id: order2.id },
    data: { totalAmount: 22.0 + 7.0 + 8.0 }
  })
  console.log(`✅ Commande ${order2.orderNumber} créée\n`)

  console.log('✨ Seeding terminé avec succès!\n')
  console.log('📊 Résumé:')
  console.log(`   - ${await prisma.user.count()} utilisateurs`)
  console.log(`   - ${await prisma.table.count()} tables`)
  console.log(`   - ${await prisma.menu.count()} items au menu`)
  console.log(`   - ${await prisma.order.count()} commandes`)
  console.log('\n🔐 Comptes de test:')
  console.log('   Admin:   admin@acoustic-club.com / password123')
  console.log('   Serveur: serveur@acoustic-club.com / password123')
  console.log('   Client:  client@acoustic-club.com / password123')
  console.log('   Premium: premium@acoustic-club.com / password123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erreur lors du seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })


