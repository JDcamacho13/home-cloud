
export default function SwitchButton ({ state, toggle }) {
  return (
    <>
      <label className="switch">
        <input type="checkbox" className="toggle" checked={state} onChange={toggle} />
      </label>

      <style jsx>{`
        .toggle {          
          appearance: none;
          outline: none;
          cursor: pointer;
          
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 999px;

          transition: all 0.5s;

          ${state
                ? (
                    `box-shadow: inset calc(2rem * 0.33) calc(2rem * -0.25) 0;
                    color: hsl(240, 100%, 95%);
                    `
                  )
            : `transform: scale(0.75);
            color: hsl(40, 100%, 50%);
            --ray-size: calc(1.5rem * -0.4);
    --offset-orthogonal: calc(1.5rem * 0.65);
    --offset-diagonal: calc(1.5rem * 0.45);
  box-shadow: 
      inset 0 0 0 1.5rem,
      calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
      var(--offset-orthogonal) 0 0 var(--ray-size),
      0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
      0 var(--offset-orthogonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
      var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
      var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);
            `}
        }
        `}</style>
    </>
  )
}
