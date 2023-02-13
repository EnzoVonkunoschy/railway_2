# Casos de uso
## Maquinarias
- Listar Maquinarias.
    - Precondiciones
        - Debe haber un botón: Listar Maquinarias.
    - Acción
        - Presionar botón Listar Maquinarias.
    - Post Condición
        - Debe aparecer el listado actualizado de las maquinarias.
- Agregar una Maquinaria.
    - Precondiciones:
        - Listado Maquinarias desplegado.
    - Acción:
        - Completar campo Nueva Maquinaria.
        - Seleccionar Botón "Agregar".

    - Post Condición:
        - Listado de maquinarias Replegado.
        - input de Maquinaria en blanco.
- Eliminar una Maquinaria.
    - Precondiciones:
        - Listado de maquinaria desplegado.
        - Seleccionado uno o más items del Listado Maquinarias.
    - Acciones:
        - Seleccionar Botón "Eliminar"
    - Poscondiciones
        - Debe replegarse el listado de maquinarias.
        - Debe desaparecer del listado de maquinarias, el item seleccionado antes de la Accion.
- Listar Usuarios.
    - Precondiciones:
        - Debe haber un usuario cargado en el servidor.
    - Acciones:
        - Seleccionar uno o más usuarios.
        - Seleccionar botón Eliminar
    - Poscondiciones:
        - Al seleccionar Listar Usuarios, deben haber desaparecido del listado, los usuarios seleccionados previamente.
        - Debe replegarse el listado de Usuarios.