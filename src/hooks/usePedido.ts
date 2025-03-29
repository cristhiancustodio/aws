import { useMemo, useState } from "react"

export const usePedido = () => {

    const [lista_pedido, setListaPedido] = useState([]);

    const agregarPedido = (producto) => {
        const existe = lista_pedido.find(item => item.id == producto.id);
        if (!existe) {
            producto.cantidad = 1;
            producto.subtotal = producto.cantidad * producto.precio;
            setListaPedido(prevPedido => [...prevPedido, producto]);
        }
    }
    const aumentarProducto = (id) => {
        cambiaCantidaProducto(id, 1);
    }
    const restarProducto = (id) => {
        cambiaCantidaProducto(id, -1);
    }

    const cambiaCantidaProducto = (id, operacion) => {
        setListaPedido(prev =>
            prev.map(producto =>
                producto.id == id
                    ? {
                        ...producto,
                        cantidad: producto.cantidad + operacion,
                        subtotal: (producto.cantidad + operacion) * producto.precio
                    }
                    : producto
            )
        );
    }
    const eliminarPedido = (id) => {
        const lista = lista_pedido.filter(item => item.id != id);
        setListaPedido(lista);
    }

    const total_compra = useMemo(() => lista_pedido.reduce((acc, item) => acc + item.cantidad, 0), [lista_pedido]);
    const precio_total = useMemo(() => {
        let sum = lista_pedido.reduce((acc, item) => acc + item.subtotal, 0);
        return sum.toFixed(2)
    }, [lista_pedido]);

    const cancelarPedido = () => {
        setListaPedido([]);
    }

    return {
        total_compra,
        agregarPedido,
        eliminarPedido,
        aumentarProducto,
        restarProducto,
        cancelarPedido,
        lista_pedido,
        precio_total
    }
}