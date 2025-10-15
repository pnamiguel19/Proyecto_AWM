# 🎓  Nombre de la aplicacion: 
- EduMatch
## 📘 Descripcion de la aplicacion:
- EduMatch tiene como objetivo conectar de manera eficiente y confiable a profesores particulares con padres de familia o estudiantes que requieren apoyo académico en diversas áreas del conocimiento. A través de una plataforma web y móvil, la aplicación facilita la búsqueda, contacto y contratación de profesores verificados, permitiendo establecer clases presenciales o virtuales según la preferencia del usuario. Además, EduMatch integra un sistema de agendamiento que simplifica la coordinación de horarios y lugares de enseñanza, fomentando el acceso a educación personalizada, segura y flexible. Por último, permite a los profesores publicar y monetizar contenido educativo, gratuito o de pago, como cursos en video y materiales didácticos, ampliando las opciones de aprendizaje y generación de ingresos.
## 💡 Problema y propuesta de la aplicacion:
- Usualmente, padres de familia requieren de profesores, en diferentes campos de la educación, para sus hijos, quienes tienen problemas de aprendizaje o han descuidado sus estudios. Sin embargo, lograr encontrar un profesor que influya confianza en los padres de familia que ofrezca clases particulares, resulta una tarea más complicada de lo que debería ser. Es por este problema que proponemos una aplicación web que permita no solo la búsqueda sencilla de profesores en cualquier área de la enseñanza, con su respectiva carta de presentación y perfil profesional, sino que también permita a los profesores publicar en esta plataforma contenido digital gratuito y/o de pago de enseñanza tales como cursos en video, entre otros. Y, si se desea, los padres de familia puedan saber la ubicación en la ciudad donde estos profesores pueden ofrecer sus servicios.



## 📌 Conclusiones:
### Miguel Avilez
- En sintesis, la elaboración de los casos de uso, historias de usuario, diagramas UML y mockups permitió obtener una visión clara y estructurada del funcionamiento de la aplicación EduMatch. Estas herramientas facilitaron la identificación de los principales actores, sus interacciones con el sistema y los procesos necesarios para cumplir los objetivos funcionales. Gracias a ello, se logró alinear los requerimientos del usuario con el diseño técnico y visual de la aplicación, garantizando coherencia entre la experiencia del usuario y la lógica de desarrollo.
- Además, este proceso contribuyó significativamente a fortalecer la planificación y validación del proyecto, ya que permitió anticipar posibles mejoras en la interfaz y en la usabilidad antes de la implementación. Los diagramas UML y los mockups ayudaron a visualizar el flujo de navegación y las relaciones entre componentes, mientras que las historias de usuario facilitaron la priorización de funcionalidades esenciales.
### Jannys Garrido
- La elaboración de los mockups permitió visualizar de forma clara la estructura, el flujo de interacción y la experiencia del usuario dentro de EduMatch. Se evidenció la coherencia entre los casos de uso, las historias de usuario y los requisitos funcionales, garantizando una base sólida para la siguiente etapa de desarrollo e implementación.
- Los mockups iniciales reflejan un diseño intuitivo, visualmente atractivo y adaptable, enfocado en la facilidad de navegación tanto para estudiantes como para profesores. La aplicación promueve la inclusión digital mediante la integración de modalidades presenciales y virtuales, permitiendo un acceso flexible y eficiente al aprendizaje.
### Steven Tintín
- Se realizó una optimización en el sistema de agendamiento, quitamos el flujo que contemplaba negociación de lugar y hora para migrar a reserva auto-confirmada con reglas explícitas: duración mínima 120 min, buffer presencial de +1 h antes y +1 h después, validación de solapes y elección de lugar en mapa. Esto simplifica la UX, reduce tiempos muertos y mejora la confiabilidad del calendario (actualizamos UC6, eliminamos UC7, agregamos holdStartAt/holdEndAt y la restricción anti-solape).
- Se consolidaron artefactos clave: diagramas de casos de uso (general y por actor, con colores), UML de clases y estados, y backlog en Word con historias priorizadas (P1/P2). Resultado: alcance del MVP claro y listo para planificar sprints con menos ambigüedad.
## 💡Recomendaciones:
### Miguel Avilez
- Se recomienda realizar una validación temprana con usuarios reales, como padres de familia y profesores, para obtener retroalimentación sobre la usabilidad y el diseño de la aplicación antes de su implementación final.
- También sería conveniente implementar un sistema de retroalimentación continua dentro de la plataforma, para que los usuarios puedan sugerir mejoras o reportar inconvenientes, promoviendo así la evolución constante.
### Jannys Garrido
- Se recomienda incorporar elementos interactivos, como notificaciones visuales y confirmaciones de cita, para mejorar la interacción y reducir posibles errores. Además, incluir un sistema de ayuda o guía rápida podría facilitar el uso de la plataforma por usuarios nuevos.
- Se sugiere realizar pruebas piloto con un grupo reducido de padres, estudiantes y profesores para evaluar la comprensión de las interfaces y la efectividad del sistema de agendamiento. Esta retroalimentación temprana permitirá realizar ajustes en la interfaz antes de la implementación final.
### Steven Tintín
- Completar casos de uso e historias de usuario para Profesor y Administrador, es decir, añadir los que faltan (p. ej., gestionar cancelaciones, reportes, revisión de verificaciones, suspensión de contenido/usuarios).
- Ampliar la documentación con todos los diagramas clave como los son casos de uso (por actor y módulo), secuencia (búsqueda, reserva, pagos, verificación), actividad (flujo de reserva) y estado (ciclo de vida de la cita).

