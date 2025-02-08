export function Tabs({ value, onValueChange, children, className }) {
    return (
      <div className={className}>
        {children.map(child =>
          child.props.value === value ? child : null
        )}
      </div>
    )
  }
  
  export  function TabsList({ children, className }) {
    return <div className={className}>{children}</div>
  }
  
  export  function TabsTrigger({ value, children, onClick, className }) {
    return (
      <button onClick={() => onClick(value)} className={className}>
        {children}
      </button>
    )
  }
  
  export  function TabsContent({ value, children }) {
    return <div>{children}</div>
  }
  