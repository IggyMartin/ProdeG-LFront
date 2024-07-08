import Layout from "./Layout";
import RulesDefinition from "./RulesDefinition";

/**
 * @module Componente_Rules
 * @description Componente utilizado en la url 'rules'
 */
function Rules() {
  return (
    <Layout page="Reglamento">
        <div className="w-full flex justify-center">
            <RulesDefinition />
        </div>
    </Layout>
  )
}

export default Rules