interface ServerActionArguments {
  input: Record<string, unknown>;
}

type MiddlewareFunction = ({ input }: ServerActionArguments) => unknown;

function createServerActionBuilder<TInput>(middleware: MiddlewareFunction[] = []) {
  return {
    use: function (fn: MiddlewareFunction) {
      return createServerActionBuilder<ReturnType<typeof fn>>([...middleware, fn]);
    },
    action: function (callback: (input: TInput) => void) {

    },
  };
}

const serverActionBuilder = createServerActionBuilder();
