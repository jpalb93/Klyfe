import os

target_dirs = [
    r"c:\projetos-eximus\Klyfe\scripts\content",
    r"c:\projetos-eximus\Klyfe\content\posts\published",
    r"c:\projetos-eximus\Klyfe\views"
]

png_to_replace = [
    "como-escolher-uma-empresa-de-energia-solar.png",
    "como-funciona-a-energia-solar-em-casas.png",
    "como-funciona-a-homologacao-da-energia-solar.png",
    "diferenca-entre-energia-solar-conectada-e-isolada.png",
    "diferenca-entre-on-grid-e-off-grid.png",
    "documentos-para-instalar-energia-solar.png",
    "em-quanto-tempo-a-energia-solar-se-paga.png",
    "energia-solar-funciona-em-dia-nublado.png",
    "energia-solar-funciona-sem-luz.png",
    "energia-solar-para-condominios.png",
    "energia-solar-para-fazendas.png",
    "energia-solar-para-hospitais.png",
    "energia-solar-para-supermercados.png",
    "energia-solar-vale-a-pena-no-nordeste.png",
    "erros-ao-contratar-energia-solar.png",
    "o-que-e-energia-solar-fotovoltaica.png",
    "o-que-e-inversor-solar.png",
    "painel-solar-precisa-de-limpeza.png",
    "precisa-de-bateria-para-energia-solar.png",
    "quanto-custa-instalar-energia-solar.png",
    "quanto-da-para-economizar-com-energia-solar.png",
    "quanto-tempo-duram-os-paineis-solares.png",
    "home-empresa-klyfe.png"
]

replaced_files_count = 0

for target_dir in target_dirs:
    for root, _, files in os.walk(target_dir):
        for file in files:
            if file.endswith(('.js', '.json', '.ejs')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = content
                for png_name in png_to_replace:
                    webp_name = png_name.replace('.png', '.webp')
                    new_content = new_content.replace(png_name, webp_name)

                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    replaced_files_count += 1
                    print(f"[UPDATED REFS] {file}")

print(f"\nDone. Updated image references in {replaced_files_count} files.")
