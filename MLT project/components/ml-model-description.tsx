interface MLModelDescriptionProps {
  title: string
  description: string
  algorithm: string
  features: string[]
  accuracy: string
}

export function MLModelDescription({ title, description, algorithm, features, accuracy }: MLModelDescriptionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Algorithm</h4>
          <p className="text-sm">{algorithm}</p>
        </div>
        <div className="space-y-2 md:col-span-2">
          <h4 className="text-sm font-medium">Key Features</h4>
          <ul className="text-sm space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-2 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Model Accuracy</span>
          <span className="text-sm font-medium">{accuracy}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 mt-2">
          <div className="h-2 rounded-full bg-green-600" style={{ width: accuracy }}></div>
        </div>
      </div>
    </div>
  )
}

