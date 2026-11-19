# Guion de grabación · Ruta Práctica

**Duración prevista: 6 minutos y 45 segundos.** Graba con tu voz. Las frases siguientes son una guía para ensayar. Explica las decisiones que realmente tomes y muestra el resultado que obtengas.

## Antes de grabar

Abre el proyecto, ChatGPT y el navegador. Crea una copia de la carpeta llamada ensayo. En la copia reemplaza app.js por el contenido de proceso/app-inicial.js. Guarda el proyecto final intacto para comparar. Abre la terminal en ensayo y ejecuta el servidor indicado en el README. Comprueba el micrófono y oculta notificaciones. Usa una ventana con una agenda vacía y datos ficticios.

## 0:00–0:35 · Presenta el problema

**Muestra:** el título de la aplicación y la tabla vacía.

**Di:** «Soy Juan Sebastián Aranda, estudiante de Ingeniería de Software de la FET. Para el seminario desarrollé con apoyo de IA una agenda de postulaciones. La pregunta que quiero responder al abrirla es a qué empresa ya envié la hoja de vida y en qué estado quedó mi proceso».

## 0:35–1:35 · Envía el primer prompt y ejecuta

**Muestra:** escribe y envía en ChatGPT: «Para una agenda de prácticas del Huila, propón cómo guardar registros con ID, cargo, empresa, municipio, fecha y estado en localStorage. Explica cómo comprobar que siguen allí tras recargar». Abre la respuesta y compara su idea con leer() y guardar() en tu copia. Muestra el comando de ejecución y abre localhost:8000.

**Di:** «Un ID identifica cada postulación aunque dos cargos tengan el mismo nombre. Para guardar la lista se convierte a texto JSON. Cuando vuelvo a abrir la página, el programa recupera ese texto y reconstruye los registros».

## 1:35–2:45 · Demuestra un problema y pide una mejora

**Muestra:** en la versión inicial activa el filtro Entrevista y crea un registro en estado Enviada. El contador aumenta y la fila queda oculta. Adjunta el app.js de ensayo a ChatGPT. Escribe y envía: «Cuando creo una postulación Enviada con el filtro Entrevista, se guarda pero no la veo. Modifica mi código para que el alta quede visible, conserva los filtros compatibles y separa la validación del formulario. Muéstrame el cambio mínimo».

**Di:** «El guardado funciona. El problema es que la pantalla parece indicar que no ocurrió nada. Quiero ver el registro que acabo de crear y mantener el filtro cuando todavía sirve».

## 2:45–3:40 · Aplica, prueba y personaliza

**Muestra:** revisa la respuesta y aplica el cambio en la copia. Si la solución es extensa, enseña solo la validación y la condición del filtro. Recarga y repite el caso anterior con otra empresa. El selector debe cambiar a Todos tras guardar. Como decisión propia, elige un municipio frecuente en tu búsqueda que todavía no esté sugerido, añádelo como opción de lugares en index.html y comprueba que aparece al escribir. Menciona el municipio que realmente elegiste.

**Di:** «Separé la lectura del formulario para que crear y editar usen la misma validación. La selección del filtro cambia después de guardar correctamente». Si tu solución difiere, explica la que implementaste. Puedes recortar el tiempo de espera de la IA sin ocultar el envío ni la prueba.

## 3:40–4:35 · Crear y leer

**Muestra:** pulsa Nueva postulación. Escribe Practicante de desarrollo, Software del Sur, Neiva, la fecha y Enviada. Guarda, señala la fila y recarga la página.

**Di:** «Crear agrega un objeto con un ID nuevo. Leer toma la lista guardada y dibuja una fila por registro. Tras recargar sigue la misma postulación, con el cargo y la empresa que escribí».

## 4:35–5:20 · Actualizar

**Muestra:** pulsa Editar en esa misma fila. Cambia Enviada por Entrevista y guarda. Señala el estado, el total y el indicador de entrevistas.

**Di:** «La empresa me llamó y actualicé el estado. El ID sigue siendo el mismo. Por eso cambia la fila existente, el total permanece igual y el indicador de entrevistas aumenta».

## 5:20–6:00 · Eliminar

**Muestra:** pulsa Eliminar. Primero elige Conservar. Abre otra vez el diálogo y confirma Eliminar. Recarga.

**Di:** «El diálogo me muestra el cargo y la empresa antes de borrar. Si cancelo, el registro sigue ahí. Al confirmar se quita el objeto con ese ID y se guarda la lista restante. Al recargar comprobamos que ya no aparece».

## 6:00–6:45 · Explica el código y cierra

**Muestra:** los tres archivos principales y el README con las capturas y prompts. Señala la mejora que aplicaste y la personalización que probaste.

**Di:** «HTML define la interfaz, CSS organiza la presentación y JavaScript conecta los botones con los registros. Elegí almacenamiento local porque esta es una agenda individual. En otro navegador aparecerá una agenda diferente. En el repositorio quedan el código, las instrucciones, las capturas y los prompts para repetir el ejercicio».

## Después de grabar

Conserva los cambios que hayas probado y registra en el README el prompt que realmente enviaste, qué devolvió y qué ajuste elegiste. Sube tu video con acceso para el docente, pega el enlace en el README de GitHub y prueba ambos enlaces en una ventana privada. Entrega solo el enlace del proyecto.
