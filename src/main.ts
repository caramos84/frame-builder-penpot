figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-frame') {
    try {
      const newFrame = createFrame1200();
      figma.currentPage.selection = [newFrame];
      figma.viewport.scrollAndZoomIntoView([newFrame]);
      
      figma.ui.postMessage({
        type: 'success',
        message: `✅ Frame 1200x1200 creado exitosamente`
      });
    } catch (error: any) {
      figma.ui.postMessage({
        type: 'error',
        message: `❌ Error: ${error.message}`
      });
    }
  }

  if (msg.type === 'create-multiple') {
    try {
      const frames = [];
      for (let i = 0; i < msg.quantity; i++) {
        frames.push(createFrame1200());
      }
      
      figma.currentPage.selection = frames;
      figma.viewport.scrollAndZoomIntoView(frames);
      
      figma.ui.postMessage({
        type: 'success',
        message: `✅ ${msg.quantity} frames creados exitosamente`
      });
    } catch (error: any) {
      figma.ui.postMessage({
        type: 'error',
        message: `❌ Error: ${error.message}`
      });
    }
  }
};

function createFrame1200() {
  // FRAME PRINCIPAL 1200x1200
  const mainFrame = figma.createFrame();
  mainFrame.name = 'Frame 1200x1200';
  mainFrame.resize(1200, 1200);
  mainFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  mainFrame.cornerRadius = 12;

  // CONCEPTO (Grupo sin autolayout - libre para mover)
  const conceptoGroup = figma.createFrame();
  conceptoGroup.name = 'Concepto';
  
  const conceptoPlaceholder = figma.createRectangle();
  conceptoPlaceholder.name = 'Placeholder';
  conceptoPlaceholder.resize(1200, 200);
  conceptoPlaceholder.fills = [{ 
    type: 'SOLID', 
    color: { r: 0.95, g: 0.95, b: 0.95 },
    opacity: 0.3
  }];
  conceptoPlaceholder.strokeWeight = 2;
  conceptoPlaceholder.strokes = [{ 
    type: 'SOLID', 
    color: { r: 0.8, g: 0.8, b: 0.8 }
  }];
  
  const conceptoText = figma.createText();
  conceptoText.characters = 'Concepto - Libre para mover';
  conceptoText.fontSize = 14;
  conceptoText.x = 50;
  conceptoText.y = 50;
  conceptoText.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
  
  conceptoGroup.appendChild(conceptoPlaceholder);
  conceptoGroup.appendChild(conceptoText);

  // HERO SECTION (Autolayout Horizontal)
  const heroSection = figma.createFrame();
  heroSection.name = 'Hero Section';
  heroSection.resize(1200, 600);
  heroSection.y = 250;
  heroSection.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  heroSection.layoutMode = 'HORIZONTAL';
  heroSection.primaryAxisAlignItems = 'CENTER';
  heroSection.counterAxisAlignItems = 'CENTER';
  heroSection.itemSpacing = 24;
  heroSection.paddingLeft = 40;
  heroSection.paddingRight = 40;
  heroSection.paddingTop = 40;
  heroSection.paddingBottom = 40;

  // Contenedor de imagen
  const imageContainer = figma.createFrame();
  imageContainer.name = 'Image Container';
  imageContainer.resize(400, 500);
  imageContainer.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  imageContainer.cornerRadius = 8;

  const imagePlaceholder = figma.createText();
  imagePlaceholder.characters = '📷 Imagen\n400x500';
  imagePlaceholder.fontSize = 16;
  imagePlaceholder.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
  imagePlaceholder.textAlignHorizontal = 'CENTER';
  imagePlaceholder.textAlignVertical = 'CENTER';

  imageContainer.appendChild(imagePlaceholder);

  // Contenedor de contenido (Autolayout Vertical)
  const contentContainer = figma.createFrame();
  contentContainer.name = 'Content Container';
  contentContainer.resize(600, 500);
  contentContainer.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  contentContainer.layoutMode = 'VERTICAL';
  contentContainer.primaryAxisAlignItems = 'MIN';
  contentContainer.counterAxisAlignItems = 'MIN';
  contentContainer.itemSpacing = 16;
  contentContainer.paddingLeft = 24;
  contentContainer.paddingRight = 24;
  contentContainer.paddingTop = 24;
  contentContainer.paddingBottom = 24;

  // Título
  const titleText = figma.createText();
  titleText.characters = 'Título Principal';
  titleText.fontSize = 36;
  // Solo quitamos esta línea
  titleText.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];

  // Descripción
  const descriptionText = figma.createText();
  descriptionText.characters = 'Descripción del producto o servicio. Aquí va el llamado a la acción convincente.';
  descriptionText.fontSize = 16;
  descriptionText.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];

  // Botón CTA
  const ctaButton = figma.createFrame();
  ctaButton.name = 'CTA Button';
  ctaButton.resize(200, 50);
  ctaButton.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.5, b: 1 } }];
  ctaButton.cornerRadius = 6;

  const buttonText = figma.createText();
  buttonText.characters = 'Llamado a la Acción';
  buttonText.fontSize = 14;
  // Solo quitamos esta línea
  buttonText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  buttonText.textAlignHorizontal = 'CENTER';
  buttonText.textAlignVertical = 'CENTER';

  ctaButton.appendChild(buttonText);

  contentContainer.appendChild(titleText);
  contentContainer.appendChild(descriptionText);
  contentContainer.appendChild(ctaButton);

  heroSection.appendChild(imageContainer);
  heroSection.appendChild(contentContainer);

  // FOOTER (Autolayout Horizontal)
  const footer = figma.createFrame();
  footer.name = 'Footer';
  footer.resize(1200, 120);
  footer.y = 1000;
  footer.fills = [{ type: 'SOLID', color: { r: 0.05, g: 0.05, b: 0.05 } }];

  footer.layoutMode = 'HORIZONTAL';
  footer.primaryAxisAlignItems = 'SPACE_BETWEEN';
  footer.counterAxisAlignItems = 'CENTER';
  footer.itemSpacing = 24;
  footer.paddingLeft = 40;
  footer.paddingRight = 40;
  footer.paddingTop = 20;
  footer.paddingBottom = 20;

  // Logo footer
  const footerLogo = figma.createText();
  footerLogo.characters = '© 2024 Brand Name';
  footerLogo.fontSize = 12;
  footerLogo.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  // Links footer
  const footerLinks = figma.createFrame();
  footerLinks.name = 'Footer Links';
  footerLinks.resize(300, 50);
  footerLinks.layoutMode = 'HORIZONTAL';
  footerLinks.primaryAxisAlignItems = 'CENTER';
  footerLinks.counterAxisAlignItems = 'CENTER';
  footerLinks.itemSpacing = 32;

  const link1 = figma.createText();
  link1.characters = 'Inicio';
  link1.fontSize = 12;
  link1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  const link2 = figma.createText();
  link2.characters = 'Servicios';
  link2.fontSize = 12;
  link2.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  const link3 = figma.createText();
  link3.characters = 'Contacto';
  link3.fontSize = 12;
  link3.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  footerLinks.appendChild(link1);
  footerLinks.appendChild(link2);
  footerLinks.appendChild(link3);

  footer.appendChild(footerLogo);
  footer.appendChild(footerLinks);

  // Añadir todos los elementos al frame principal
  mainFrame.appendChild(conceptoGroup);
  mainFrame.appendChild(heroSection);
  mainFrame.appendChild(footer);

  return mainFrame;
}