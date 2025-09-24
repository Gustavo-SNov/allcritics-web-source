import * as React from "react"
import { cn } from "@/lib/utils" // Sua função de utilidade para mesclar classes

// 1. Definimos as propriedades que nosso componente aceitará
export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string; // Propriedade opcional para o rótulo
    error?: string; // Propriedade opcional para a mensagem de erro
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, name, error, ...props }, ref) => {

        // Gera um ID único para conectar o label ao textarea, importante para acessibilidade
        const id = React.useId();

        return (
            <div className="w-full">
                {/* 2. Renderiza o label apenas se a prop 'label' for fornecida */}
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        {label}
                    </label>
                )}

                <textarea
                    id={id}
                    name={name}
                    className={cn(
                        // 3. Classes base para o estilo padrão do AllCritics
                        "flex w-full min-h-[80px] rounded-md border bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500",
                        "transition-colors duration-200 ease-in-out",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
                        // 4. Lógica de Estilo Condicional
                        {
                            // Se houver erro, as bordas e o foco ficam vermelhos
                            "border-red-600 focus-visible:ring-red-500": error,
                            // Se não houver erro, as bordas são padrão e o foco é roxo
                            "border-gray-700 focus-visible:ring-purple-500": !error,
                            // Estilo para quando o campo estiver desabilitado
                            "opacity-50 cursor-not-allowed": props.disabled
                        },
                        className // Permite adicionar classes extras de fora do componente
                    )}
                    ref={ref}
                    {...props}
                />

                {/* 5. Renderiza a mensagem de erro apenas se a prop 'error' for fornecida */}
                {error && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)
// Define um nome de exibição para facilitar a depuração no React DevTools
Textarea.displayName = "Textarea"

export { Textarea }