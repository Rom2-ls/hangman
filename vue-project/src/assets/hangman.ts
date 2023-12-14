import {
  Engine,
  Render,
  Bodies,
  Composite,
  Runner,
  Body,
  Composites,
  Constraint,
  Mouse,
  MouseConstraint,
  World,
} from 'matter-js'

export const Hangman = (number: number | null) => {
  document.querySelector('.animation')!.innerHTML = ''

  const engine = Engine.create()

  const render = Render.create({
    element: document.querySelector('.animation') as HTMLElement,
    engine: engine,
    options: {
      width: 1200,
      height: 720,
      background: '#fff',
      wireframes: false,
    },
  })

  const { world } = engine

  Render.run(render)

  var runner = Runner.create()

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    })

  Composite.add(engine.world, mouseConstraint)

  // keep the mouse in sync with rendering
  render.mouse = mouse

  // run the engine
  Runner.run(runner, engine)

  let hangmanParts = createParts(number ? number : 0)

  Composite.add(engine.world, hangmanParts)

  const updateParts = (newNumber: number) => {
    Composite.clear(world, false)
    Engine.clear(engine)
    Render.stop(render)
    Runner.stop(runner)

    // Remove mouse constraint
    World.remove(world, mouseConstraint)

    Hangman(newNumber)
  }

  return updateParts
}

const createParts = (number: number) => {
  var group = Body.nextGroup(true)

  var rope = Composites.stack(
    0,
    0,
    8,
    1,
    0,
    0,
    function ({ x, y }: { x: number; y: number }) {
      return Bodies.rectangle(580, -50, 20, 10, {
        collisionFilter: { group: group },
        render: { visible: number ? (number > 6 ? false : true) : true },
      })
    },
  )

  Composites.chain(rope, 0.5, 0, -0.5, 0, {
    stiffness: 0.5,
    length: 0,
    render: { type: 'line' },
  })

  Composite.add(
    rope,
    Constraint.create({
      bodyB: rope.bodies[7],
      pointB: { x: 20, y: 0 },
      pointA: { x: rope.bodies[0].position.x, y: rope.bodies[0].position.y },
      stiffness: 0.5,
    }),
  )

  // create hangman body parts
  var head = Bodies.circle(580, -150, 20, {
    collisionFilter: { group: group },
    render: {
      fillStyle: 'black',
      visible: number ? (number > 5 ? false : true) : true,
    },
  })
  var body = Bodies.rectangle(580, -100, 10, 80, {
    collisionFilter: { group: group },
    render: {
      fillStyle: 'black',
      visible: number ? (number > 4 ? false : true) : true,
    },
  })
  var leftArm = Bodies.rectangle(550, -100, 10, 50, {
    collisionFilter: { group: group },
    render: {
      fillStyle: 'black',
      visible: number ? (number > 3 ? false : true) : true,
    },
  })
  var rightArm = Bodies.rectangle(610, -100, 10, 50, {
    collisionFilter: { group: group },
    render: {
      fillStyle: 'black',
      visible: number ? (number > 2 ? false : true) : true,
    },
  })
  var leftLeg = Bodies.rectangle(570, -50, 10, 50, {
    collisionFilter: { group: group },
    render: {
      fillStyle: 'black',
      visible: number ? (number > 1 ? false : true) : true,
    },
  })
  var rightLeg = Bodies.rectangle(590, -50, 10, 50, {
    collisionFilter: { group: group },
    render: {
      fillStyle: 'black',
      visible: number ? (number > 0 ? false : true) : true,
    },
  })

  var ropeToHead = Constraint.create({
    bodyA: rope.bodies[0],
    bodyB: head,
    pointA: { x: -10, y: 0 },
    pointB: { x: 0, y: -20 },
    stiffness: 0.5,
    length: 0,
    render: {
      visible: false,
    },
  })

  var headToBody = Constraint.create({
    bodyA: head,
    bodyB: body,
    pointA: { x: 0, y: 20 },
    pointB: { x: 0, y: -40 },
    stiffness: 0.5,
    length: 0,
    render: {
      visible: false,
    },
  })

  var bodyToLeftArm = Constraint.create({
    bodyA: body,
    bodyB: leftArm,
    pointA: { x: 5, y: -40 },
    pointB: { x: 5, y: 25 },
    stiffness: 0.5,
    length: 0,
    render: {
      visible: false,
    },
  })

  var bodyToRightArm = Constraint.create({
    bodyA: body,
    bodyB: rightArm,
    pointA: { x: -5, y: -40 },
    pointB: { x: -5, y: 25 },
    stiffness: 0.5,
    length: 0,
    render: {
      visible: false,
    },
  })

  var bodyToLeftLeg = Constraint.create({
    bodyA: body,
    bodyB: leftLeg,
    pointA: { x: 5, y: 40 },
    pointB: { x: 5, y: 25 },
    stiffness: 0.5,
    length: 0,
    render: {
      visible: false,
    },
  })

  var bodyToRightLeg = Constraint.create({
    bodyA: body,
    bodyB: rightLeg,
    pointA: { x: -5, y: 40 },
    pointB: { x: -5, y: 25 },
    stiffness: 0.5,
    length: 0,
    render: {
      visible: false,
    },
  })

  return [
    rope,
    head,
    body,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    ropeToHead,
    headToBody,
    bodyToLeftArm,
    bodyToRightArm,
    bodyToLeftLeg,
    bodyToRightLeg,
  ]
}
