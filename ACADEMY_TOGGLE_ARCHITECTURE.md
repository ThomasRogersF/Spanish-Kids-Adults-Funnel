# Academy Toggle Architecture Diagram

## Component Hierarchy

```
RecommendationResults
├── AcademyToggle (NEW)
│   ├── Switch (from @/components/ui/switch)
│   └── Card (from @/components/ui/card)
├── RecommendationCard (UPDATED)
│   ├── Button (dynamic payment link)
│   └── Loading state handling
└── Other existing components
```

## Data Flow Diagram

```mermaid
graph TD
    A[User toggles Academy] --> B[AcademyToggle Component]
    B --> C[handleAcademyToggle function]
    C --> D[Set transitioning state]
    D --> E[Update isAcademyIncluded state]
    E --> F[Calculate payment links]
    F --> G[Pass payment links to RecommendationCard]
    G --> H[Update button href attributes]
    H --> I[Clear transitioning state]
    
    J[Payment Links Config] --> F
    K[RecommendationResults State] --> F
```

## State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Initial
    Initial --> AcademyOff: Default state
    AcademyOff --> Transitioning: User toggles ON
    Transitioning --> AcademyOn: Update complete
    AcademyOn --> Transitioning: User toggles OFF
    Transitioning --> AcademyOff: Update complete
    AcademyOff --> [*]: Component unmount
    AcademyOn --> [*]: Component unmount
```

## Component Props Interface

### AcademyToggle Props
```typescript
interface AcademyToggleProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  isLoading?: boolean;
}
```

### Updated RecommendationCard Props
```typescript
interface RecommendationCardProps {
  content: RecommendationContent;
  type: 'group' | 'private' | 'kids' | 'bundled';
  isPrimary?: boolean;
  onSelect?: () => void;
  onViewDetails?: () => void;
  paymentLink?: string; // NEW
  isLoading?: boolean; // NEW
}
```

## Payment Link Resolution Logic

```mermaid
graph LR
    A[Plan Type] --> B{Academy Included?}
    B -->|No| C[Without Academy Link]
    B -->|Yes| D[With Academy Link]
    C --> E[Final Payment URL]
    D --> E
    
    F[Group Plan] --> G[paymentLinks.group]
    H[Private Plan] --> I[paymentLinks.private]
    J[Bundled Plan] --> K[paymentLinks.bundled]
    L[Kids Plan] --> M[paymentLinks.kids]
```

## Responsive Breakpoints

```mermaid
graph TD
    A[Mobile < 768px] --> B[Stacked layout]
    A --> C[Larger touch targets]
    A --> D[Simplified animations]
    
    E[Tablet 768px - 1024px] --> F[Medium layout]
    E --> G[Standard touch targets]
    E --> H[Full animations]
    
    I[Desktop > 1024px] --> J[Full layout]
    I --> K[Hover states]
    I --> L[Enhanced animations]
```

## Animation Timeline

```mermaid
gantt
    title Toggle Animation Timeline
    dateFormat X
    axisFormat %s
    
    section User Interaction
    Toggle Click : 0, 0.1
    
    section Loading State
    Set Loading : 0.1, 0.2
    Disable Interactions : 0.1, 0.4
    
    section Visual Feedback
    Color Transition : 0.1, 0.3
    Switch Animation : 0.1, 0.2
    
    section State Update
    Update Links : 0.2, 0.3
    Re-render Cards : 0.3, 0.4
    
    section Completion
    Clear Loading : 0.4, 0.5
    Enable Interactions : 0.4, 1.0
```

## Accessibility Implementation

### ARIA Label Structure
```typescript
// Toggle component
aria-label="Include SpanishVIP Academy premium add-on"
aria-checked={isChecked}
aria-describedby="academy-description"

// Description element
id="academy-description"
```

### Keyboard Navigation
```typescript
// Key bindings
Space: Toggle state
Enter: Toggle state
Tab: Navigate to next focusable element
Shift+Tab: Navigate to previous focusable element
```

## Error Handling Strategy

```mermaid
graph TD
    A[Toggle Action] --> B{Valid State?}
    B -->|Yes| C[Execute Toggle]
    B -->|No| D[Show Error Message]
    C --> E{Payment Links Available?}
    E -->|Yes| F[Update UI]
    E -->|No| G[Show Fallback UI]
    D --> H[Log Error]
    G --> H
    H --> I[Recover State]
```

## Performance Optimizations

1. **Debouncing**: Prevent rapid toggle state changes
2. **Memoization**: Cache payment link calculations
3. **Lazy Loading**: Load payment link config only when needed
4. **Optimized Re-renders**: Use React.memo for expensive components
5. **Animation Performance**: Use CSS transforms instead of layout changes

## Testing Strategy Matrix

| Test Type | Component | Focus Area | Priority |
|-----------|-----------|-------------|----------|
| Unit | AcademyToggle | Toggle behavior, state changes | High |
| Unit | RecommendationCard | Payment link updates | High |
| Integration | RecommendationResults | State management | High |
| Accessibility | All | ARIA compliance | Medium |
| Responsive | AcademyToggle | Mobile layout | Medium |
| E2E | Full flow | User journey | Low |