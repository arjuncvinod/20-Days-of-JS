let alien = {
    name: 'Navin',
    tech: 'JS',
    laptop: {
        cpu: 'i7',
        ram: 4,
        brand: 'Asus'
    }
}
for (let key in alien) {
    console.log(key, alien[key]);
}

for (let key in alien.laptop) {
    console.log(key, alien.laptop[key]);
}